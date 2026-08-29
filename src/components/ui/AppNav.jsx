import { Home, Map, UserRound } from "lucide-react";

const items = [
  { id: "home", label: "Hem", icon: Home },
  { id: "map", label: "Karta", icon: Map },
  { id: "profile", label: "Profil", icon: UserRound },
];

export default function AppNav({ active, onChange }) {
  return <nav className="order-2 z-50 flex h-[72px] shrink-0 items-center justify-around border-t border-slate-200 bg-white/95 px-3 backdrop-blur-xl lg:order-1 lg:h-screen lg:w-[104px] lg:flex-col lg:justify-start lg:gap-3 lg:border-r lg:border-t-0 lg:px-3 lg:py-7">
    <div className="mb-8 hidden h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 font-black text-slate-950 shadow-lg shadow-amber-200 lg:flex">H</div>
    {items.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onChange(id)} className={`group flex h-14 min-w-[76px] flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition-all lg:h-20 lg:w-full ${active === id ? "bg-slate-950 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}>
      <Icon className="h-5 w-5" strokeWidth={active === id ? 2.5 : 2} />
      <span>{label}</span>
    </button>)}
  </nav>;
}