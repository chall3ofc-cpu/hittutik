import React from 'react';

export default function ProfileTab({ isPremium, setIsPremium }) {
  return (
    <div className="flex-1 bg-[#F8F9FA] min-h-screen p-8 lg:p-12 animate-fade-in pl-[100px] lg:pl-[120px]">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-[#0F172A]">
          Min profil
        </h1>
        <p className="text-sm text-[#64748B] font-semibold mt-1">
          Hantera dina kontoinställningar och medlemskap.
        </p>
      </header>

      <div className="max-w-2xl space-y-6">
        {/* Kontokort */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600">
              U
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#0F172A]">Testanvändare</h3>
              <p className="text-sm text-[#64748B]">user@hittutik.se</p>
            </div>
          </div>
          <span className={`text-xs font-black px-3 py-1.5 rounded-full ${
            isPremium ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-slate-100 text-slate-500'
          }`}>
            {isPremium ? '👑 Premium' : 'Gratiskonto'}
          </span>
        </div>

        {/* Medlemskapshantering */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <h4 className="font-bold text-base text-[#0F172A]">Mitt medlemskap</h4>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Med Hittutik+ får du tillgång till realtidskartan, exakta lagerhyllor i butik och offline-läge.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsPremium(!isPremium)}
              className={`font-bold text-sm px-5 py-2.5 rounded-xl transition ${
                isPremium 
                  ? 'border border-red-200 text-red-600 hover:bg-red-50' 
                  : 'bg-[#FBBF24] text-[#0A0E1A] hover:scale-[1.02]'
              }`}
            >
              {isPremium ? 'Avsluta prenumeration (Demo)' : 'Aktivera Hittutik+ (Demo)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
