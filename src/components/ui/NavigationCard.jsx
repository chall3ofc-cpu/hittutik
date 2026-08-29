import { Footprints, Navigation } from "lucide-react";

export default function NavigationCard({ phase, steps, stepIndex, onParked, onFinish }) {
  const walking = phase === "walking";
  const current = steps[stepIndex] || steps[0];
  return (
    <div className="absolute bottom-4 left-1/2 z-30 w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl sm:bottom-6 sm:p-6">
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${walking ? "bg-emerald-400 text-slate-950" : "bg-blue-500"}`}>{walking ? <Footprints /> : <Navigation />}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-wider text-amber-400">{walking ? "Gångläge" : "Körläge"} · Steg {Math.min(stepIndex + 1, steps.length || 1)} av {steps.length || "…"}</p>
          {current ? <p className="mt-1 text-base font-semibold leading-snug sm:text-lg" dangerouslySetInnerHTML={{ __html: current.instruction }} /> : <p className="mt-1 text-base font-semibold">Beräknar rutt…</p>}
        </div>
        {current?.distance && <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold">{current.distance}</span>}
      </div>
      <button onClick={walking ? onFinish : onParked} className="mt-5 w-full rounded-2xl bg-white px-5 py-3.5 font-black text-slate-950 transition hover:bg-amber-400">{walking ? "Avsluta navigering" : "🅿️ Jag har parkerat"}</button>
    </div>
  );
}