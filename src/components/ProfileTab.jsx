<<<<<<< HEAD
import React from 'react';

export default function ProfileTab({ vehicle, setVehicle }) {
  return (
    <div className="p-8 max-w-md mx-auto space-y-6 animate-fade-in">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Inställningar</h2>
      
      {/* Fordonsinställningar */}
      <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 space-y-4">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Fordon</h3>
        <div className="space-y-3">
          
          {/* Regnr */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registreringsnummer</label>
            <input 
              type="text" 
              value={vehicle.regnr} 
              onChange={(e) => setVehicle({...vehicle, regnr: e.target.value})}
              className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-mono uppercase font-bold outline-none focus:border-slate-900 transition text-slate-800"
              placeholder="T.EX. ABC123"
            />
          </div>

          {/* Fordonstyp */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fordonstyp</label>
            <select 
              value={vehicle.type}
              onChange={(e) => setVehicle({...vehicle, type: e.target.value})}
              className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition"
            >
              <option>Standardbil</option>
              <option>Bil med släp</option>
              <option>Hög SUV / Skåpbil</option>
            </select>
          </div>

        </div>
      </div>

      <p className="text-[11px] text-slate-400 px-2 leading-relaxed">
        Dina fordonsuppgifter sparas lokalt. Appen använder informationen för att anpassa din rutt och rita ut rätt fordonsmodell på kartan så att du enkelt hittar tillbaka.
      </p>
    </div>
  );
}
=======
import React from 'react';

export default function ProfileTab({ vehicle, setVehicle }) {
  return (
    <div className="p-8 max-w-md mx-auto space-y-6 animate-fade-in">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Inställningar</h2>
      
      {/* Fordonsinställningar */}
      <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 space-y-4">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Fordon</h3>
        <div className="space-y-3">
          
          {/* Regnr */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registreringsnummer</label>
            <input 
              type="text" 
              value={vehicle.regnr} 
              onChange={(e) => setVehicle({...vehicle, regnr: e.target.value})}
              className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-mono uppercase font-bold outline-none focus:border-slate-900 transition text-slate-800"
              placeholder="T.EX. ABC123"
            />
          </div>

          {/* Fordonstyp */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fordonstyp</label>
            <select 
              value={vehicle.type}
              onChange={(e) => setVehicle({...vehicle, type: e.target.value})}
              className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition"
            >
              <option>Standardbil</option>
              <option>Bil med släp</option>
              <option>Hög SUV / Skåpbil</option>
            </select>
          </div>

        </div>
      </div>

      <p className="text-[11px] text-slate-400 px-2 leading-relaxed">
        Dina fordonsuppgifter sparas lokalt. Appen använder informationen för att anpassa din rutt och rita ut rätt fordonsmodell på kartan så att du enkelt hittar tillbaka.
      </p>
    </div>
  );
}
>>>>>>> 99b736e (Första uppladdningen med alla filer)
