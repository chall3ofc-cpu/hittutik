import React, { useState, useEffect, useRef } from 'react';

export default function MapTab({ isPremium, setShowPaywall }) {
  return (
    <div className="flex-1 bg-[#F8F9FA] min-h-screen p-8 lg:p-12 animate-fade-in pl-[100px] lg:pl-[120px]">
      <header className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-[#0F172A]">
          Sök i närområdet
        </h1>
        <p className="text-sm text-[#64748B] font-semibold mt-1">
          Hitta lokala butikslager och varor i realtid.
        </p>
      </header>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-[calc(100vh-220px)] min-h-[400px] flex items-center justify-center relative">
        {/* Om användaren inte är premium visas en snygg blockering på kartan */}
        {!isPremium ? (
          <div className="absolute inset-0 bg-[#0A0E1A]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center text-white">
            <span className="text-4xl mb-4">👑</span>
            <h3 className="text-2xl font-black tracking-tight mb-2">Kartan kräver Hittutik+</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Uppgradera för att låsa upp realtidskartan, lagerstatus för specifika hyllor och offline-läge.
            </p>
            <button
              type="button"
              onClick={() => setShowPaywall(true)}
              className="bg-[#FBBF24] text-[#0A0E1A] font-bold text-sm px-6 py-3 rounded-xl hover:scale-105 transition shadow-lg"
            >
              Uppgradera nu (49 kr/mån)
            </button>
          </div>
        ) : null}

        {/* Dummy-karta för tillfället */}
        <div className="text-center p-8 space-y-2">
          <div className="text-slate-300 text-6xl">🗺️</div>
          <p className="text-slate-400 font-medium text-sm">Google Maps laddas in...</p>
        </div>
      </div>
    </div>
  );
}
