import { MapPin, Navigation, Star } from "lucide-react";

export default function ProductCard({ place, onNavigate }) {
  if (!place) return null;
  return (
    <div className="absolute bottom-4 left-1/2 z-30 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 rounded-[28px] bg-white p-5 shadow-2xl sm:bottom-6 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wider text-amber-600">Hittad i närheten</p>
          <h2 className="mt-1 truncate text-xl font-black text-slate-950 sm:text-2xl">{place.name}</h2>
          <p className="mt-1 flex items-start gap-1 text-sm font-medium text-slate-500"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span className="truncate">{place.formatted_address || place.vicinity}</span></p>
        </div>
        {place.rating && <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-bold text-amber-700"><Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />{place.rating}</span>}
      </div>
      <button onClick={onNavigate} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:bg-slate-800"><Navigation className="h-4 w-4" /> Hitta hit</button>
    </div>
  );
}