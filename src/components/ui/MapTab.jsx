import { useEffect, useState } from "react";
import MapSearch from "@/components/hittutik/MapSearch";
import GoogleMapView from "@/components/hittutik/GoogleMapView";
import ProductCard from "@/components/hittutik/ProductCard";
import NavigationCard from "@/components/hittutik/NavigationCard";

export default function MapTab({ premium, onPaywall, vehicle }) {
  const [query, setQuery] = useState("");
  const [gps, setGps] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [parkedAt, setParkedAt] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [offline, setOffline] = useState(() => localStorage.getItem("hittutik-offline") === "true");

  // Hämta exakt GPS-position vid start
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(({ coords }) => setGps({ lat: coords.latitude, lng: coords.longitude }), () => {}, { enableHighAccuracy: true });
  }, []);

  const toggleOffline = () => { if (!premium) return onPaywall(); const next = !offline; setOffline(next); localStorage.setItem("hittutik-offline", String(next)); };

  const park = () => {
    if (!navigator.geolocation) { setParkedAt(gps || selectedPlace?.geometry?.location); setPhase("walking"); return; }
    navigator.geolocation.getCurrentPosition(({ coords }) => { setParkedAt({ lat: coords.latitude, lng: coords.longitude }); setPhase("walking"); }, () => { setParkedAt(gps || selectedPlace?.geometry?.location); setPhase("walking"); }, { enableHighAccuracy: true });
  };
  const finish = () => { setPhase("idle"); setSteps([]); setStepIndex(0); };

  return (
    <section className="relative h-full min-h-0 overflow-hidden bg-slate-100">
      <GoogleMapView
        gps={gps}
        searchQuery={query}
        phase={phase}
        selectedPlace={selectedPlace}
        parkedAt={parkedAt}
        onPlacesFound={(results, first) => { setPlaces(results); setSelectedPlace(first); setPhase("idle"); }}
        onPlaceSelect={(place) => setSelectedPlace(place)}
        onStepsLoaded={setSteps}
        onStepChange={setStepIndex}
      />
      <MapSearch query={query} onQuery={(v) => { setQuery(v); if (!v) { setPlaces([]); setSelectedPlace(null); } }} offline={offline} onOffline={toggleOffline} />
      {selectedPlace && phase === "idle" && <ProductCard place={selectedPlace} onNavigate={() => setPhase("driving")} />}
      {(phase === "driving" || phase === "walking") && <NavigationCard phase={phase} steps={steps} stepIndex={stepIndex} onParked={park} onFinish={finish} />}
      <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow backdrop-blur sm:bottom-auto sm:right-5 sm:top-24">GPS · {gps ? "LIVE" : "SÖKER"}</div>
    </section>
  );
}