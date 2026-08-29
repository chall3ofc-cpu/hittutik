import { useState } from "react";
import AppNav from "@/components/hittutik/AppNav";
import HomeTab from "@/components/hittutik/HomeTab";
import MapTab from "@/components/hittutik/MapTab";
import ProfileTab from "@/components/hittutik/ProfileTab";
import PaywallModal from "@/components/hittutik/PaywallModal";

export default function Home() {
  const [tab, setTab] = useState("home");
  const [paywall, setPaywall] = useState(false);
  const [premium, setPremium] = useState(() => localStorage.getItem("hittutik-premium") === "true");
  const [vehicle, setVehicle] = useState(() => JSON.parse(localStorage.getItem("hittutik-vehicle") || '{"registration":"","type":"Standardbil"}'));
  const saveVehicle = (next) => { setVehicle(next); localStorage.setItem("hittutik-vehicle", JSON.stringify(next)); };
  const activate = () => { setPremium(true); localStorage.setItem("hittutik-premium", "true"); setPaywall(false); };
  return <main className="flex h-screen w-screen overflow-hidden bg-white font-body"><AppNav active={tab} onChange={setTab} /><div className="order-1 min-h-0 min-w-0 flex-1 lg:order-2">{tab === "home" && <HomeTab premium={premium} onPremium={() => setPaywall(true)} onOpenMap={() => setTab("map")} />}{tab === "map" && <MapTab premium={premium} onPaywall={() => setPaywall(true)} vehicle={vehicle} />}{tab === "profile" && <ProfileTab vehicle={vehicle} onSave={saveVehicle} />}</div><PaywallModal open={paywall} onClose={() => setPaywall(false)} onActivate={activate} /></main>;
}