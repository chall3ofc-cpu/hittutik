<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';

export default function MapTab({ vehicle, isPremium, setShowPaywall, isOffline, setIsOffline }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isParked, setIsParked] = useState(false);
  const [routeSteps, setRouteSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [markers, setMarkers] = useState([]);
  
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const userMarkerRef = useRef(null);
  const parkingCoordinateRef = useRef(null);

  // Exakt JavaScript Style Array från Snazzy Maps (Light Dream)
  const lightDreamStyle = [
    {"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.4},{"lightness":37.6},{"visibility":"on"}]},
    {"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.6},{"visibility":"on"}]},
    {"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.2},{"visibility":"on"}]},
    {"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"visibility":"on"}]},
    {"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.2},{"lightness":2.4},{"visibility":"on"}]},
    {"featureType":"poi","stylers":[{"visibility":"off"}]}
  ];

  // Initiera den riktiga Google-kartan med live-GPS
  useEffect(() => {
    if (!window.google || map) return;

    // Hämta API-nyckeln från din .env-fil säkert
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const googleMap = new google.maps.Map(mapRef.current, {
      zoom: 14,
      center: { lat: 59.3293, lng: 18.0686 }, // Stockholm som backup innan GPS svarar
      styles: lightDreamStyle,
      disableDefaultUI: true,
      zoomControl: true
    });

    directionsServiceRef.current = new google.maps.DirectionsService();
    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: googleMap,
      suppressMarkers: true, // Vi ritar egna snygga markörer istället för Googles standard
      polylineOptions: { strokeColor: '#0284c7', strokeWidth: 5, strokeOpacity: 0.8 }
    });

    // Hämta och spåra användarens RIKTIGA position (blå plupp) live utan delay
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Centrera kartan på användaren vid första laddningen
        if (!userMarkerRef.current) {
          googleMap.setCenter(userPos);
        }

        // Uppdatera eller skapa den blåa GPS-pluppen
        if (userMarkerRef.current) {
          userMarkerRef.current.setPosition(userPos);
        } else {
          userMarkerRef.current = new google.maps.Marker({
            position: userPos,
            map: googleMap,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#0284c7',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            },
            title: "Min position"
          });
        }
      }, (error) => console.error("GPS-fel:", error), {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }

    setMap(googleMap);
  }, []);
  // Sök efter riktiga butiker (IRL) via Google Places
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!map || !searchQuery.trim()) return;

    // Rensa gamla sökresultat från kartan
    markers.forEach(m => m.setMap(null));
    setMarkers([]);
    setActiveSearch('');
    setIsNavigating(false);

    const request = {
      location: map.getCenter(),
      radius: '15000', // Sök inom 15 km radie
      query: searchQuery
    };

    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        // Ta den närmaste/bästa träffen (t.ex. Byggmax eller ICA IRL)
        const place = results[0]; 
        setActiveSearch(place.name);
        map.setCenter(place.geometry.location);
        map.setZoom(15);

        // Skapa den ikoniska varmgula markören för målbutiken
        const newMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'https://google.com'
          }
        });

        setMarkers([newMarker]);
      } else {
        alert('Inga fysiska butiker hittades i närheten för den varan/butiken.');
      }
    });
  };

  // Beräkna riktig rutt via Google Directions (DRIVING eller WALKING)
  const calculateRoute = (mode) => {
    if (!userMarkerRef.current || markers.length === 0) return;

    const start = userMarkerRef.current.getPosition();
    const destination = markers[0].getPosition();

    const request = {
      origin: start,
      destination: destination,
      travelMode: mode === 'WALKING' ? google.maps.TravelMode.WALKING : google.maps.TravelMode.DRIVING
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRendererRef.current.setDirections(result);
        const steps = result.routes[0].legs[0].steps;
        setRouteSteps(steps);
        setCurrentStepIndex(0);
        setIsNavigating(true);
      } else {
        alert('Kunde inte beräkna en rutt på vägarna: ' + status);
      }
    });
  };

  // Hantera Twisten: Skifta mellan Körläge och Parkerat/Gångläge
  const handleParkedToggle = () => {
    if (!isPremium && isOffline) {
      setShowPaywall(true);
      return;
    }
    
    if (!isParked) {
      // Spara bilens exakta GPS-koordinat där man klickade (Car Locator)
      parkingCoordinateRef.current = userMarkerRef.current.getPosition();
      setIsParked(true);
      calculateRoute('WALKING'); // Starta riktig gång-navigering
    } else {
      setIsParked(false);
      calculateRoute('DRIVING'); // Tillbaka till bilkörning
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#f4f3ef]">
      {/* Den riktiga live Google-kartan */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Sökfältet överst på kartan */}
      <div className="absolute top-4 left-4 right-4 z-20 max-w-md mx-auto space-y-2">
        <form onSubmit={handleSearchSubmit} className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm flex items-center border border-slate-200/40">
          <input 
            type="text" 
            placeholder="Sök butik eller vara (t.ex. Byggmax, skruv)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-medium text-slate-800 placeholder-slate-400"
          />
          <button type="submit" className="text-slate-400 hover:text-slate-900 transition ml-2">🔍</button>
        </form>
        
        {/* Offline-simulering */}
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={() => isPremium ? setIsOffline(!isOffline) : setShowPaywall(true)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${isOffline ? 'bg-red-500 text-white border-red-600 shadow-sm' : 'bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200/60'}`}
          >
            {isOffline ? ' can Offline aktiv' : '📶 Simulera offline'}
          </button>
        </div>
      </div>

      {/* Understa infokortet vid sökresultat */}
      {activeSearch && !isNavigating && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-sm border border-slate-100 max-w-md mx-auto z-20">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-0.5">
              <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Verifierad butik</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{activeSearch}</h3>
              <p className="text-xs text-slate-400">Varan finns på Hylla 4, Gång B</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => calculateRoute('DRIVING')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm"
          >
            🚀 Starta navigering (Körläge)
          </button>
        </div>
      )}

      {/* Riktig sväng-för-sväng instruktionspanel */}
      {isNavigating && routeSteps.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white p-5 rounded-[24px] shadow-lg max-w-md mx-auto z-20 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[9px] bg-white/10 text-amber-400 font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
              {isParked ? '🚶‍♂️ Gångläge' : '🚗 Körläge'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Instruktion {currentStepIndex + 1} av {routeSteps.length}</span>
          </div>
          
          {/* Renderar de levande svänginstruktionerna från Google Maps API */}
          <h4 
            className="font-medium text-sm text-slate-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: routeSteps[currentStepIndex]?.instruction || 'Följ den markerade rutten på kartan.' }}
          />

          <div className="flex gap-2 pt-1">
            <button 
              type="button"
              onClick={handleParkedToggle}
              className="flex-1 bg-white text-slate-900 hover:bg-slate-50 font-bold py-3 rounded-xl text-xs transition"
            >
              {isParked ? '🔄 Gå till Körläge' : '🅿️ Jag har parkerat'}
            </button>
            
            {currentStepIndex < routeSteps.length - 1 ? (
              <button 
                type="button"
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 rounded-xl text-xs transition"
              >
                Nästa
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => { setIsNavigating(false); setActiveSearch(''); }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 rounded-xl text-xs transition"
              >
                Framme
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
=======
import React, { useState, useEffect, useRef } from 'react';

export default function MapTab({ vehicle, isPremium, setShowPaywall, isOffline, setIsOffline }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isParked, setIsParked] = useState(false);
  const [routeSteps, setRouteSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [markers, setMarkers] = useState([]);
  
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const userMarkerRef = useRef(null);
  const parkingCoordinateRef = useRef(null);

  // Exakt JavaScript Style Array från Snazzy Maps (Light Dream)
  const lightDreamStyle = [
    {"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.4},{"lightness":37.6},{"visibility":"on"}]},
    {"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.6},{"visibility":"on"}]},
    {"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.2},{"visibility":"on"}]},
    {"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"visibility":"on"}]},
    {"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.2},{"lightness":2.4},{"visibility":"on"}]},
    {"featureType":"poi","stylers":[{"visibility":"off"}]}
  ];

  // Initiera den riktiga Google-kartan med live-GPS
  useEffect(() => {
    if (!window.google || map) return;

    // Hämta API-nyckeln från din .env-fil säkert
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const googleMap = new google.maps.Map(mapRef.current, {
      zoom: 14,
      center: { lat: 59.3293, lng: 18.0686 }, // Stockholm som backup innan GPS svarar
      styles: lightDreamStyle,
      disableDefaultUI: true,
      zoomControl: true
    });

    directionsServiceRef.current = new google.maps.DirectionsService();
    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: googleMap,
      suppressMarkers: true, // Vi ritar egna snygga markörer istället för Googles standard
      polylineOptions: { strokeColor: '#0284c7', strokeWidth: 5, strokeOpacity: 0.8 }
    });

    // Hämta och spåra användarens RIKTIGA position (blå plupp) live utan delay
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Centrera kartan på användaren vid första laddningen
        if (!userMarkerRef.current) {
          googleMap.setCenter(userPos);
        }

        // Uppdatera eller skapa den blåa GPS-pluppen
        if (userMarkerRef.current) {
          userMarkerRef.current.setPosition(userPos);
        } else {
          userMarkerRef.current = new google.maps.Marker({
            position: userPos,
            map: googleMap,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#0284c7',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            },
            title: "Min position"
          });
        }
      }, (error) => console.error("GPS-fel:", error), {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }

    setMap(googleMap);
  }, []);
  // Sök efter riktiga butiker (IRL) via Google Places
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!map || !searchQuery.trim()) return;

    // Rensa gamla sökresultat från kartan
    markers.forEach(m => m.setMap(null));
    setMarkers([]);
    setActiveSearch('');
    setIsNavigating(false);

    const request = {
      location: map.getCenter(),
      radius: '15000', // Sök inom 15 km radie
      query: searchQuery
    };

    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        // Ta den närmaste/bästa träffen (t.ex. Byggmax eller ICA IRL)
        const place = results[0]; 
        setActiveSearch(place.name);
        map.setCenter(place.geometry.location);
        map.setZoom(15);

        // Skapa den ikoniska varmgula markören för målbutiken
        const newMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'https://google.com'
          }
        });

        setMarkers([newMarker]);
      } else {
        alert('Inga fysiska butiker hittades i närheten för den varan/butiken.');
      }
    });
  };

  // Beräkna riktig rutt via Google Directions (DRIVING eller WALKING)
  const calculateRoute = (mode) => {
    if (!userMarkerRef.current || markers.length === 0) return;

    const start = userMarkerRef.current.getPosition();
    const destination = markers[0].getPosition();

    const request = {
      origin: start,
      destination: destination,
      travelMode: mode === 'WALKING' ? google.maps.TravelMode.WALKING : google.maps.TravelMode.DRIVING
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRendererRef.current.setDirections(result);
        const steps = result.routes[0].legs[0].steps;
        setRouteSteps(steps);
        setCurrentStepIndex(0);
        setIsNavigating(true);
      } else {
        alert('Kunde inte beräkna en rutt på vägarna: ' + status);
      }
    });
  };

  // Hantera Twisten: Skifta mellan Körläge och Parkerat/Gångläge
  const handleParkedToggle = () => {
    if (!isPremium && isOffline) {
      setShowPaywall(true);
      return;
    }
    
    if (!isParked) {
      // Spara bilens exakta GPS-koordinat där man klickade (Car Locator)
      parkingCoordinateRef.current = userMarkerRef.current.getPosition();
      setIsParked(true);
      calculateRoute('WALKING'); // Starta riktig gång-navigering
    } else {
      setIsParked(false);
      calculateRoute('DRIVING'); // Tillbaka till bilkörning
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#f4f3ef]">
      {/* Den riktiga live Google-kartan */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Sökfältet överst på kartan */}
      <div className="absolute top-4 left-4 right-4 z-20 max-w-md mx-auto space-y-2">
        <form onSubmit={handleSearchSubmit} className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm flex items-center border border-slate-200/40">
          <input 
            type="text" 
            placeholder="Sök butik eller vara (t.ex. Byggmax, skruv)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm font-medium text-slate-800 placeholder-slate-400"
          />
          <button type="submit" className="text-slate-400 hover:text-slate-900 transition ml-2">🔍</button>
        </form>
        
        {/* Offline-simulering */}
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={() => isPremium ? setIsOffline(!isOffline) : setShowPaywall(true)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${isOffline ? 'bg-red-500 text-white border-red-600 shadow-sm' : 'bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200/60'}`}
          >
            {isOffline ? ' can Offline aktiv' : '📶 Simulera offline'}
          </button>
        </div>
      </div>

      {/* Understa infokortet vid sökresultat */}
      {activeSearch && !isNavigating && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-[24px] shadow-sm border border-slate-100 max-w-md mx-auto z-20">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-0.5">
              <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Verifierad butik</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{activeSearch}</h3>
              <p className="text-xs text-slate-400">Varan finns på Hylla 4, Gång B</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => calculateRoute('DRIVING')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm"
          >
            🚀 Starta navigering (Körläge)
          </button>
        </div>
      )}

      {/* Riktig sväng-för-sväng instruktionspanel */}
      {isNavigating && routeSteps.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white p-5 rounded-[24px] shadow-lg max-w-md mx-auto z-20 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[9px] bg-white/10 text-amber-400 font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
              {isParked ? '🚶‍♂️ Gångläge' : '🚗 Körläge'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Instruktion {currentStepIndex + 1} av {routeSteps.length}</span>
          </div>
          
          {/* Renderar de levande svänginstruktionerna från Google Maps API */}
          <h4 
            className="font-medium text-sm text-slate-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: routeSteps[currentStepIndex]?.instruction || 'Följ den markerade rutten på kartan.' }}
          />

          <div className="flex gap-2 pt-1">
            <button 
              type="button"
              onClick={handleParkedToggle}
              className="flex-1 bg-white text-slate-900 hover:bg-slate-50 font-bold py-3 rounded-xl text-xs transition"
            >
              {isParked ? '🔄 Gå till Körläge' : '🅿️ Jag har parkerat'}
            </button>
            
            {currentStepIndex < routeSteps.length - 1 ? (
              <button 
                type="button"
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 rounded-xl text-xs transition"
              >
                Nästa
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => { setIsNavigating(false); setActiveSearch(''); }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 rounded-xl text-xs transition"
              >
                Framme
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
>>>>>>> 99b736e (Första uppladdningen med alla filer)
