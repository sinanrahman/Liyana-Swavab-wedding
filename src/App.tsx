import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { config } from "@/lib/invitation-config";
import { FontLoader } from "@/components/FontLoader";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingPetals } from "@/components/FloatingPetals";
import { Loader } from "@/components/Loader";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { CornerOrnaments } from "@/components/CornerOrnaments";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <FontLoader />
      <AnimatedBackground />
      <FloatingPetals count={14} />
      <AnimatePresence>
        {showLoader && <Loader onDone={() => setShowLoader(false)} />}
      </AnimatePresence>

      <main className="relative z-10 min-h-screen px-4 sm:px-6 py-8 sm:py-14 max-w-2xl mx-auto">
        <div className="space-y-6 sm:space-y-8">
          {/* Hero parchment */}
          <section className="parchment-card p-6 sm:p-12">
            <CornerOrnaments />
            <div className="text-center space-y-6 hero-glow">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="arabic text-2xl sm:text-3xl text-[var(--crimson)] leading-relaxed">
                  {config.bismillah}
                </div>
                <div className="label-caps text-[10px] sm:text-xs text-[var(--muted-foreground)] mt-2">
                  {config.bismillahTr}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="label-caps text-xs text-[var(--secondary)] tracking-[0.3em]">
                  {config.eventLabel}
                </div>
                <div className="mt-3 font-display text-base sm:text-lg text-[var(--muted-foreground)] italic">
                  {config.hosts}
                </div>
                <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {config.bodyText}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="py-2"
              >
                <h1
                  className="font-display font-light text-[var(--crimson)]"
                  style={{ fontSize: "clamp(38px,9vw,72px)", lineHeight: 1.05 }}
                >
                  {config.honoree1.name}
                </h1>
                <div className="text-xs text-[var(--muted-foreground)] italic mt-1">
                  {config.honoree1.subtitle}
                </div>
                <div className="script text-5xl sm:text-6xl text-[var(--secondary)] my-2">
                  {config.connector}
                </div>
                <h2
                  className="font-display font-light text-[var(--crimson)]"
                  style={{ fontSize: "clamp(38px,9vw,72px)", lineHeight: 1.05 }}
                >
                  {config.honoree2.name}
                </h2>
                <div className="text-xs text-[var(--muted-foreground)] italic mt-1">
                  {config.honoree2.subtitle}
                </div>
                <div className="label-caps text-[11px] text-[var(--secondary)] mt-4 tracking-[0.3em]">
                  {config.culturalPhrase}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="h-px w-24 mx-auto bg-[var(--secondary)] opacity-50 my-4" />
                <p className="font-display text-xl sm:text-2xl text-[var(--foreground)]">
                  With great joy, we invite you to share in this blessed day.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Countdown */}
          <Reveal>
            <section className="parchment-card p-6 sm:p-8">
              <CornerOrnaments />
              <div className="label-caps text-[11px] text-center text-[var(--secondary)] mb-5">
                Counting Down
              </div>
              <Countdown targetIso={config.eventDateISO} />
            </section>
          </Reveal>

          {/* Event details */}
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="event-card parchment-card p-6 block"
              >
                <CornerOrnaments />
                <div className="label-caps text-[10px] text-[var(--secondary)] mb-2">When</div>
                <div className="font-display text-2xl text-[var(--crimson)]">
                  {config.eventDate}
                </div>
                <div className="text-[var(--muted-foreground)] mt-1">at {config.eventTime}</div>
                <div className="label-caps text-[10px] text-[var(--secondary)] mt-4">
                  Tap for directions
                </div>
              </a>
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="event-card parchment-card p-6 block"
              >
                <CornerOrnaments />
                <div className="label-caps text-[10px] text-[var(--secondary)] mb-2">Where</div>
                <div className="font-display text-2xl text-[var(--crimson)]">
                  {config.venueName}
                </div>
                <div className="text-[var(--muted-foreground)] mt-1">{config.venueAddress}</div>
                <div className="label-caps text-[10px] text-[var(--secondary)] mt-4">
                  Tap for directions
                </div>
              </a>
            </div>
          </Reveal>

          {/* Closing */}
          <Reveal>
            <section className="parchment-card p-8 text-center">
              <CornerOrnaments />
              <p className="font-display italic text-lg text-[var(--foreground)]">
                {config.closingBlessing}
              </p>
              <div className="script text-4xl text-[var(--crimson)] mt-3">{config.closingWord}</div>
              <div className="arabic text-2xl text-[var(--secondary)] mt-1">
                {config.closingArabic}
              </div>
              <div className="h-px w-16 mx-auto bg-[var(--secondary)] opacity-40 my-4" />
              <p className="label-caps text-[10px] text-[var(--muted-foreground)]">
                {config.footerTagline}
              </p>
            </section>
          </Reveal>

          {/* Footer */}
          <footer className="text-center pt-2 pb-6">
            <div className="font-['Playfair_Display'] italic text-2xl text-[var(--secondary)]">
              {config.honoree1.name.charAt(0).toUpperCase() + config.honoree1.name.slice(1)} {config.connector} {config.honoree2.name}
            </div>
            <div className="label-caps text-[10px] text-[var(--muted-foreground)] mt-1 tracking-[0.3em]">
              {config.eventDate}
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
