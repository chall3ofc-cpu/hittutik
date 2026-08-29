import React, { useState } from 'react';
import HomeTab from './components/HomeTab';
import MapTab from './components/MapTab';
import ProfileTab from './components/ProfileTab';

export default function App() {
  // Navigation och flikar
  const [activeTab, setActiveTab] = useState('home');
  
  // Gemensamma states som delas mellan flikarna
  const [vehicle, setVehicle] = useState({ regnr: 'ABC123', type: 'Standardbil' });
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-24 font-sans text-slate-900 antialiased">
      
      {/* 🔄 FLIK-VÄXLARE: Rendera rätt flik baserat på activeTab */}
      {activeTab === 'home' && (
        <HomeTab 
          setActiveTab={setActiveTab} 
          isPremium={isPremium} 
          setShowPaywall={setShowPaywall} 
        />
      )}
      
      {activeTab === 'map' && (
        <MapTab 
          vehicle={vehicle} 
          isPremium={isPremium} 
          setShowPaywall={setShowPaywall} 
          isOffline={isOffline} 
          setIsOffline={setIsOffline} 
        />
      )}
      
      {activeTab === 'profil' && (
        <ProfileTab 
          vehicle={vehicle} 
          setVehicle={setVehicle} 
        />
      )}

      {/* 📱 MINIMALISTISK NAVIGATIONSBAR I BOTTEN */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-slate-100 h-16 flex justify-around items-center z-40 backdrop-blur-md">
        <button 
          type="button" 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold uppercase transition-colors ${activeTab === 'home' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="text-lg">🏠</span>
          <span>Hem</span>
        </button>
        <button 
          type="button" 
          onClick={() => setActiveTab('map')} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold uppercase transition-colors ${activeTab === 'map' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="text-lg">🗺️</span>
          <span>Karta</span>
        </button>
        <button 
          type="button" 
          onClick={() => setActiveTab('profil')} 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold uppercase transition-colors ${activeTab === 'profil' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="text-lg">⚙️</span>
          <span>Profil</span>
        </button>
      </nav>

      {/* 💎 PREMIUM POPUP PAYWALL FOR HITTUTIK+ */}
      {showPaywall && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 transition-all">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-xl relative border border-slate-100">
            <button 
              type="button" 
              onClick={() => setShowPaywall(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full w-8 h-8 flex items-center justify-center text-xs"
            >
              ✕
            </button>
            
            <div className="space-y-1 mt-2">
              <span className="text-2xl">💎</span>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Skaffa Hittutik+</h2>
              <p className="text-xs text-slate-400 font-medium">49 kr / månad — Avsluta när du vill</p>
            </div>

            {/* Premiumfunktioner i listform */}
            <div className="my-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">📵</span>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-slate-800">Fullt offline-läge</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Kartor och butikshyllor sparas lokalt. Fungerar i djupa betonggarage helt utan mobiltäckning.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">🛒</span>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-slate-800">Avancerad Multi-Sök</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">Sök på flera varor samtidigt och få den snabbaste rutten till lägsta pris i ditt närområde.</p>
                </div>
              </div>
            </div>

            {/* Köpknapp */}
            <button 
              type="button" 
              onClick={() => { 
                setIsPremium(true); 
                setShowPaywall(false); 
                alert('Tack för din prenumeration! Hittutik+ är nu aktiverat.'); 
              }} 
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl text-xs shadow-sm hover:bg-slate-800 transition active:scale-[0.99]"
            >
              Starta prenumeration
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-3">Ingen bindningstid. Avsluta med ett klick.</p>
          </div>
        </div>
      )}

    </div>
  );
}
