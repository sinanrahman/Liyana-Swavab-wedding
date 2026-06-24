import { motion } from "motion/react";

export function Loader({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#f5ece7" }}
      onAnimationComplete={() => setTimeout(onDone, 2600)}
    >
      <div className="flex flex-col items-center gap-6">
        <svg width="140" height="140" viewBox="0 0 140 140" className="text-[#c8a27a]">
          <motion.circle
            cx="70" cy="70" r="60" fill="none" stroke="currentColor" strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M70 20 Q90 50 70 70 Q50 50 70 20 Z M70 120 Q50 90 70 70 Q90 90 70 120 Z M20 70 Q50 50 70 70 Q50 90 20 70 Z M120 70 Q90 90 70 70 Q90 50 120 70 Z"
            fill="none" stroke="currentColor" strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.circle
            cx="70" cy="70" r="6" fill="currentColor"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, duration: 0.6 }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="label-caps text-xs text-[#7a5c56]"
        >
          Preparing your invitation
        </motion.div>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c8a27a]"
            initial={{
              x: 0, y: 0, opacity: 0,
            }}
            animate={{
              x: Math.cos((i / 12) * Math.PI * 2) * 90,
              y: Math.sin((i / 12) * Math.PI * 2) * 90,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2, delay: 0.5 + i * 0.1, repeat: Infinity, repeatDelay: 0.5 }}
            style={{ boxShadow: "0 0 8px #c8a27a" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
