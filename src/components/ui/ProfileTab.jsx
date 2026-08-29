import { CarFront, Check, Info } from "lucide-react";
import { useState } from "react";

export default function ProfileTab({ vehicle, onSave }) {
  const [form, setForm] = useState(vehicle);
  const [saved, setSaved] = useState(false);
  const submit = (e) => { e.preventDefault(); onSave(form); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  return <section className="h-full overflow-y-auto bg-[#f7f7f3] px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
    <div className="mx-auto max-w-3xl"><span className="text-sm font-black uppercase tracking-[0.2em] text-amber-500">Profil</span><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Ditt fordon</h1><p className="mt-3 max-w-xl text-slate-500">Finjustera vägen hela vägen till rätt parkeringsplats.</p>
      <form onSubmit={submit} className="mt-9 rounded-[32px] bg-white p-6 shadow-sm sm:p-9"><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-amber-400"><CarFront /></div><label className="text-sm font-bold text-slate-700">Registreringsnummer</label><input value={form.registration} onChange={(e) => setForm({ ...form, registration: e.target.value.toUpperCase() })} maxLength={7} placeholder="ABC 123" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-bold uppercase outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100" />
        <label className="mt-6 block text-sm font-bold text-slate-700">Fordonstyp</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold outline-none focus:border-amber-400"><option>Standardbil</option><option>Bil med släp</option><option>Hög SUV / Skåpbil</option></select>
        <div className="mt-6 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"><Info className="mt-0.5 h-5 w-5 shrink-0" /><p>Specifikationerna hjälper algoritmen att leda bilen runt trånga parkeringshus och låga tak innan ankomst.</p></div><button className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800">{saved && <Check className="h-4 w-4" />}{saved ? "Sparat" : "Spara fordonsinställningar"}</button></form>
    </div>
  </section>;
}