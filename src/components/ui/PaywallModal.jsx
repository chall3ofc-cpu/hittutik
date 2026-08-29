import { Check, Crown, X } from "lucide-react";

const benefits = ["Offlinekartor för hela resan", "Butikslager och hyllplats i realtid", "Fordonsanpassade rutter till parkeringen"];

export default function PaywallModal({ open, onClose, onActivate }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={onClose}>
    <div className="w-full max-w-md rounded-t-[32px] bg-white p-7 shadow-2xl sm:rounded-[32px]" onMouseDown={(e) => e.stopPropagation()}>
      <div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400"><Crown className="h-6 w-6" /></div><button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100" aria-label="Stäng"><X /></button></div>
      <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950">Hittutik+</h2>
      <p className="mt-1 text-slate-500">Hela vägen fram, även utan täckning.</p>
      <div className="my-6 space-y-4">{benefits.map((item) => <div key={item} className="flex gap-3 text-sm font-semibold text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-4 w-4" /></span>{item}</div>)}</div>
      <button onClick={onActivate} className="w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:bg-slate-800">Aktivera för 49 kr/mån</button>
      <p className="mt-3 text-center text-xs text-slate-400">Avsluta när du vill.</p>
    </div>
  </div>;
}