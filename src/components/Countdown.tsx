import { useEffect, useState } from "react";

function calc(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [t, setT] = useState(() => calc(target));
  useEffect(() => {
    const i = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(i);
  }, [target]);
  const items = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hours" },
    { v: t.mins, l: "Minutes" },
    { v: t.secs, l: "Seconds" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
      {items.map((it) => (
        <div key={it.l} className="flex flex-col items-center">
          <div className="countdown-num">{String(it.v).padStart(2, "0")}</div>
          <div className="countdown-label mt-2">{it.l}</div>
        </div>
      ))}
    </div>
  );
}
