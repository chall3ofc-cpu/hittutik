import { ArrowRight, CheckCircle2, Crown, Radio } from "lucide-react";

export default function HomeTab({ premium, onPremium, onOpenMap }) {
  return <section className="h-full overflow-y-auto bg-[#f7f7f3] px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
    <div className="mx-auto flex min-h-full max-w-7xl flex-col">
      <header><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm"><Radio className="h-3.5 w-3.5 text-emerald-500" /> Lokala lager, live</div><h1 className="text-5xl font-black tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-8xl">Hittutik<span className="text-amber-400">.</span></h1><p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-slate-500 sm:text-xl">Hitta varan lokalt. Hela vägen fram.</p></header>
      <div className="mt-10 grid flex-1 gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <button onClick={onOpenMap} className="group flex min-h-[240px] flex-col justify-between rounded-[32px] bg-slate-950 p-7 text-left text-white shadow-2xl shadow-slate-300 transition-transform hover:-translate-y-1 sm:p-9"><span className="text-sm font-bold text-amber-400">SÖK · KÖR · HITTA</span><span className="flex items-end justify-between gap-4"><span className="text-3xl font-black sm:text-5xl">Öppna kartan</span><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-950"><ArrowRight /></span></span></button>
        <div className="grid gap-5"><button onClick={onPremium} className="rounded-[28px] bg-amber-400 p-6 text-left transition hover:bg-amber-300"><span className="flex items-center gap-2 text-sm font-black"><Crown className="h-4 w-4" /> HITTUTIK+</span><div className="mt-7 flex items-end justify-between"><span className="text-xl font-black">{premium ? "Premium aktivt" : "Mer träffsäkert. Offline."}</span><span className="font-bold">49 kr/mån</span></div></button><div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-6"><CheckCircle2 className="h-7 w-7 text-emerald-500" /><div><p className="font-bold text-slate-900">Datasynk uppdaterad</p><p className="mt-0.5 text-sm text-slate-400">Alla butikslager är aktuella</p></div></div></div>
      </div>
    </div>
  </section>;
}