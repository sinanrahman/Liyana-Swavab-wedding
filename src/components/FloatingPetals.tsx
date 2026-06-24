import { useMemo } from "react";

export function FloatingPetals({ count = 20 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 10 + Math.random() * 14,
        sway: 10 + Math.random() * 30,
        rot: Math.random() * 360,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-40px]"
          style={{
            left: `${p.left}%`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        >
          <div
            style={{
              animation: `petal-sway ${p.duration / 3}s ease-in-out infinite alternate`,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <path
                d="M12 2 C16 6, 18 12, 12 22 C6 12, 8 6, 12 2 Z"
                fill="#8b1e2d"
                opacity="0.55"
              />
            </svg>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes petal-fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(110vh); }
        }
        @keyframes petal-sway {
          0% { margin-left: 0px; }
          100% { margin-left: 40px; }
        }
      `}</style>
    </div>
  );
}
