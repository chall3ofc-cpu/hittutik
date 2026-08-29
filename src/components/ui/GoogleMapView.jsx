const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import { LIGHT_DREAM_STYLE } from "@/lib/mapStyle";
import { animateAlongPath, badgeIcon, pinIcon, pulsingDotIcon } from "@/lib/mapAnimate";

const DEFAULT_ORIGIN = { lat: 59.34, lng: 18.371 }; // Värmdö om ingen GPS
const HARDWARE = ["skruv", "färg", "hammare"];

export default function GoogleMapView({ gps, searchQuery, phase, selectedPlace, parkedAt, onPlacesFound, onPlaceSelect, onStepsLoaded, onStepChange }) {
  const containerRef = useRef(null);
  const googleRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const storeMarkersRef = useRef([]);
  const dirRendererRef = useRef(null);
  const dirServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const carMarkerRef = useRef(null);
  const personMarkerRef = useRef(null);
  const lastStepRef = useRef(-1);
  const [status, setStatus] = useState("loading");

  // Initiera kartan en gång
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await db.functions.invoke("getGoogleMapsKey", {});
        const loader = new Loader({ apiKey: data.apiKey, version: "weekly", libraries: ["geometry", "places"] });
        const google = await loader.load();
        if (cancelled) return;
        googleRef.current = google;
        const map = new google.maps.Map(containerRef.current, {
          center: gps || DEFAULT_ORIGIN,
          zoom: 13,
          styles: LIGHT_DREAM_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
          gestureHandling: "greedy",
          clickableIcons: false,
        });
        mapRef.current = map;
        placesServiceRef.current = new google.maps.places.PlacesService(map);
        dirServiceRef.current = new google.maps.DirectionsService();
        dirRendererRef.current = new google.maps.DirectionsRenderer({ map, suppressMarkers: true, polylineOptions: { strokeColor: "#1976e9", strokeWeight: 6, strokeOpacity: 0.9 } });
        setStatus("ready");
      } catch (e) {
        setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Pulserande blå prick för användarens live-position
  useEffect(() => {
    const google = googleRef.current;
    if (!google || !mapRef.current || !gps) return;
    if (!userMarkerRef.current) {
      userMarkerRef.current = new google.maps.Marker({ map: mapRef.current, position: gps, icon: pulsingDotIcon(google), zIndex: 999 });
      mapRef.current.setCenter(gps);
    } else userMarkerRef.current.setPosition(gps);
  }, [gps]);

  // Dynamisk sökning efter riktiga butiker med Places Service
  useEffect(() => {
    const google = googleRef.current;
    if (!google || !placesServiceRef.current) return;
    storeMarkersRef.current.forEach(({ marker }) => marker.setMap(null));
    storeMarkersRef.current = [];
    const q = searchQuery.trim().toLocaleLowerCase("sv");
    if (!q) return;
    const placesQuery = HARDWARE.includes(q) ? "byggvaruhus" : searchQuery.trim();
    const location = gps || DEFAULT_ORIGIN;
    placesServiceRef.current.textSearch({ query: placesQuery, location, radius: 20000 }, (results, resStatus) => {
      if (resStatus !== "OK" || !results) { onPlacesFound([], null); return; }
      const top = results.slice(0, 6);
      top.forEach((place) => {
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: mapRef.current,
          icon: pinIcon(google, "#64748b"),
          label: { text: place.name, fontSize: "11px", fontWeight: "700", color: "#334155" },
        });
        marker.addListener("click", () => onPlaceSelect(place));
        storeMarkersRef.current.push({ marker, placeId: place.place_id });
      });
      onPlacesFound(top, top[0]);
      if (mapRef.current) {
        const bounds = new google.maps.LatLngBounds();
        top.forEach((p) => bounds.extend(p.geometry.location));
        if (gps) bounds.extend(gps);
        mapRef.current.fitBounds(bounds, 90);
      }
    });
  }, [searchQuery, gps]);

  // Markera vald butik
  useEffect(() => {
    const google = googleRef.current;
    if (!google || !selectedPlace) return;
    storeMarkersRef.current.forEach(({ marker, placeId }) => marker.setIcon(pinIcon(google, placeId === selectedPlace.place_id ? "#ffbd19" : "#64748b")));
  }, [selectedPlace]);

  // Rutt + riktiga sväng-instruktioner beroende på fas
  useEffect(() => {
    const google = googleRef.current;
    if (!google || !mapRef.current || !dirServiceRef.current) return;
    const map = mapRef.current;
    lastStepRef.current = -1;
    const clearMoving = () => {
      carMarkerRef.current?.setMap(null); carMarkerRef.current = null;
      personMarkerRef.current?.setMap(null); personMarkerRef.current = null;
    };
    if (phase === "idle") { dirRendererRef.current.set("directions", null); clearMoving(); return; }
    if (!selectedPlace) return;
    const dest = selectedPlace.geometry.location;
    const origin = phase === "driving" ? (gps || DEFAULT_ORIGIN) : parkedAt;
    if (!origin) return;
    const mode = phase === "driving" ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING;
    dirServiceRef.current.route({ origin, destination: dest, travelMode: mode }, (result, resStatus) => {
      if (resStatus !== "OK" || !result) return;
      dirRendererRef.current.set("directions", result);
      dirRendererRef.current.setOptions({ polylineOptions: { strokeColor: phase === "driving" ? "#1976e9" : "#10b981", strokeWeight: 6, strokeOpacity: 0.9 } });
      const leg = result.routes[0].legs[0];
      const steps = leg.steps.map((s) => ({ instruction: s.instructions, distance: s.distance.text }));
      onStepsLoaded(steps);
      let cum = 0;
      const thresholds = leg.steps.map((s) => { cum += s.distance.value; return cum; });
      const total = leg.distance.value || 1;
      const path = result.routes[0].overview_path;
      const onProgress = (t) => {
        const traveled = total * t;
        let idx = 0;
        while (idx < thresholds.length - 1 && traveled > thresholds[idx]) idx++;
        if (idx !== lastStepRef.current) { lastStepRef.current = idx; onStepChange(idx); }
      };
      if (phase === "driving") {
        map.fitBounds(result.routes[0].bounds, 90);
        clearMoving();
        const car = new google.maps.Marker({ map, position: origin, icon: badgeIcon(google, "🚙", "#1976e9"), zIndex: 1000 });
        carMarkerRef.current = car;
        animateAlongPath(google, car, path, 5000, onProgress);
      } else {
        map.setZoom(17); map.panTo(dest);
        if (!carMarkerRef.current) carMarkerRef.current = new google.maps.Marker({ map, position: parkedAt, icon: badgeIcon(google, "🚙", "#1976e9"), zIndex: 900 });
        carMarkerRef.current.setPosition(parkedAt);
        carMarkerRef.current.setOpacity(0.4);
        personMarkerRef.current?.setMap(null);
        const person = new google.maps.Marker({ map, position: parkedAt, icon: badgeIcon(google, "🚶", "#10b981"), zIndex: 1000 });
        personMarkerRef.current = person;
        animateAlongPath(google, person, path, 4000, onProgress);
      }
    });
  }, [phase]);

  return (
    <div className="absolute inset-0 h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {status === "loading" && <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm font-semibold text-slate-400">Laddar karta…</div>}
      {status === "error" && <div className="absolute inset-0 flex items-center justify-center bg-slate-100 px-6 text-center text-sm font-semibold text-slate-500">Kunde inte ladda Google Maps. Kontrollera att API-nyckeln är giltig och att Maps JavaScript API + Places API + Directions API är aktiverade.</div>}
    </div>
  );
}