<<<<<<< HEAD
import React from 'react';

export default function HomeTab({ setActiveTab, isPremium, setShowPaywall }) {
  return (
    <div className="flex-1 bg-[#F8F9FA] min-h-screen p-8 lg:p-12 animate-fade-in pl-[100px] lg:pl-[120px]">
      
      {/* Liten grön live-indikator */}
      <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#137333] px-3 py-1.5 rounded-full text-xs font-bold tracking-wide mb-4 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#137333] inline-block animate-pulse"></span>
        <span>Lokala lager, live</span>
      </div>

      {/* Stor rubrik med den gula punkten */}
      <header className="mb-12">
        <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-[#0F172A] flex items-center gap-1">
          Hittutik<span className="text-[#FBBF24]">.</span>
        </h1>
        <p className="text-lg lg:text-xl text-[#64748B] font-semibold mt-3 tracking-wide">
          Hitta varan lokal. Hela vägen fram.
        </p>
      </header>

      {/* Grid-system för de två stora korten i botten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        
        {/* Det gigantiska mörka "Öppna kartan"-kortet (Tar 2/3 av bredden) */}
        <div 
          onClick={() => setActiveTab('map')}
          className="md:col-span-2 bg-[#0A0E1A] p-10 rounded-[32px] text-white shadow-xl flex flex-col justify-between h-[280px] cursor-pointer hover:scale-[1.01] hover:bg-[#111726] transition-all group"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-black tracking-widest text-[#FBBF24] uppercase">SÖK • KÖR • HITTA</span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <h2 className="text-4xl font-black tracking-tight group-hover:text-[#FBBF24] transition-colors">
              Öppna kartan
            </h2>
            <div className="w-14 h-14 bg-[#FBBF24] rounded-full flex items-center justify-center text-[#0A0E1A] text-xl font-bold shadow-md group-hover:scale-110 transition-transform">
              ➔
            </div>
          </div>
        </div>

        {/* Högra sidan med de två mindre staplade korten */}
        <div className="flex flex-col gap-6">
          
          {/* Det gula "Hittutik+"-kortet */}
          <div className="bg-[#FBBF24] p-6 rounded-[28px] text-[#0A0E1A] shadow-md flex flex-col justify-between h-[128px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black tracking-wider uppercase opacity-60">👑 HITTUTIK+</span>
                <h4 className="font-extrabold text-base leading-tight">Mer träffsäkert. Offline.</h4>
              </div>
              <span className="text-xs font-black bg-[#0A0E1A]/10 px-2 py-0.5 rounded-md">49 kr/mån</span>
            </div>
            {!isPremium && (
              <button 
                type="button"
                onClick={() => setShowPaywall(true)}
                className="w-full bg-[#0A0E1A] text-white hover:bg-slate-800 transition font-bold text-xs py-2.5 rounded-xl mt-2 shadow-sm"
              >
                Uppgradera nu
              </button>
            )}
          </div>

          {/* Det vita "Datasynk"-kortet */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4 h-[128px]">
            <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333] text-xl font-bold shadow-inner">
              ✓
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-[#0F172A]">Datasynk uppdaterad</h4>
              <p className="text-xs text-[#64748B] leading-tight">Alla butikslager är aktuella i ditt närområde.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
=======
import React from 'react';

export default function HomeTab({ setActiveTab, isPremium, setShowPaywall }) {
  return (
    <div className="flex-1 bg-[#F8F9FA] min-h-screen p-8 lg:p-12 animate-fade-in pl-[100px] lg:pl-[120px]">
      
      {/* Liten grön live-indikator */}
      <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#137333] px-3 py-1.5 rounded-full text-xs font-bold tracking-wide mb-4 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#137333] inline-block animate-pulse"></span>
        <span>Lokala lager, live</span>
      </div>

      {/* Stor rubrik med den gula punkten */}
      <header className="mb-12">
        <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-[#0F172A] flex items-center gap-1">
          Hittutik<span className="text-[#FBBF24]">.</span>
        </h1>
        <p className="text-lg lg:text-xl text-[#64748B] font-semibold mt-3 tracking-wide">
          Hitta varan lokal. Hela vägen fram.
        </p>
      </header>

      {/* Grid-system för de två stora korten i botten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        
        {/* Det gigantiska mörka "Öppna kartan"-kortet (Tar 2/3 av bredden) */}
        <div 
          onClick={() => setActiveTab('map')}
          className="md:col-span-2 bg-[#0A0E1A] p-10 rounded-[32px] text-white shadow-xl flex flex-col justify-between h-[280px] cursor-pointer hover:scale-[1.01] hover:bg-[#111726] transition-all group"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-black tracking-widest text-[#FBBF24] uppercase">SÖK • KÖR • HITTA</span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <h2 className="text-4xl font-black tracking-tight group-hover:text-[#FBBF24] transition-colors">
              Öppna kartan
            </h2>
            <div className="w-14 h-14 bg-[#FBBF24] rounded-full flex items-center justify-center text-[#0A0E1A] text-xl font-bold shadow-md group-hover:scale-110 transition-transform">
              ➔
            </div>
          </div>
        </div>

        {/* Högra sidan med de två mindre staplade korten */}
        <div className="flex flex-col gap-6">
          
          {/* Det gula "Hittutik+"-kortet */}
          <div className="bg-[#FBBF24] p-6 rounded-[28px] text-[#0A0E1A] shadow-md flex flex-col justify-between h-[128px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black tracking-wider uppercase opacity-60">👑 HITTUTIK+</span>
                <h4 className="font-extrabold text-base leading-tight">Mer träffsäkert. Offline.</h4>
              </div>
              <span className="text-xs font-black bg-[#0A0E1A]/10 px-2 py-0.5 rounded-md">49 kr/mån</span>
            </div>
            {!isPremium && (
              <button 
                type="button"
                onClick={() => setShowPaywall(true)}
                className="w-full bg-[#0A0E1A] text-white hover:bg-slate-800 transition font-bold text-xs py-2.5 rounded-xl mt-2 shadow-sm"
              >
                Uppgradera nu
              </button>
            )}
          </div>

          {/* Det vita "Datasynk"-kortet */}
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4 h-[128px]">
            <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333] text-xl font-bold shadow-inner">
              ✓
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-[#0F172A]">Datasynk uppdaterad</h4>
              <p className="text-xs text-[#64748B] leading-tight">Alla butikslager är aktuella i ditt närområde.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
>>>>>>> 99b736e (Första uppladdningen med alla filer)
