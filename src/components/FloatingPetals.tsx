import { useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function FloatingPetals({ count = 20 }: { count?: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (val) => -(val * 0.2)); // 20% scroll speed parallax

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const z = (Math.random() - 0.5) * 400;
        return {
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 12,
          duration: 14 + Math.random() * 14,
          size: 10 + Math.random() * 14,
          sway: 10 + Math.random() * 30,
          rot: Math.random() * 360,
          z,
          blur: z > 100 ? 6 : z > 0 ? 3 : 0.5,
          scale: z > 100 ? 3 : z > 0 ? 1.8 : 0.8,
          opacity: z > 100 ? 0.2 : 0.55,
        };
      }),
    [count]
  );
  return (
    <motion.div style={{ y }} className="pointer-events-none fixed inset-[-20%] w-[140%] h-[140%] z-[1] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-40px]"
          style={{
            left: `${p.left}%`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `translateZ(${p.z}px) scale(${p.scale})`,
            filter: `blur(${p.blur}px)`,
            zIndex: p.z > 0 ? 10 : 0,
            willChange: "transform, filter"
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
                fill="#C48A8A"
                opacity={p.opacity}
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
    </motion.div>
  );
}
