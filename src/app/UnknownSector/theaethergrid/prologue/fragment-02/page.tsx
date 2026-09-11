"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrologueFragment02() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] px-4 py-8 font-mono text-cyan-400 sm:px-6 md:px-12 md:py-12">
      {/* Atmospheric scanlines */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

      {/* Ambient grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.72)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-4xl"
      >
        {/* Archive header */}
        <header className="mb-10 border-b border-cyan-500/20 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.4em] text-cyan-500/50">
                VΣLOHE SYSTEM
              </div>

              <h1 className="mt-3 text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl">
                RECOVERED MEMORY
              </h1>

              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-cyan-400/70">
                PROLOGUE // MEMORY FRAGMENT 02
              </p>
            </div>

            <div className="text-left text-[8px] uppercase tracking-[0.2em] text-cyan-500/40 sm:text-right">
              <div>FILE // PRLG-002</div>
              <div className="mt-1">STATUS // DECRYPTED</div>
              <div className="mt-1">INTEGRITY // 100%</div>
            </div>
          </div>
        </header>

        {/* Memory notice */}
        <div className="mb-10 border border-cyan-500/20 bg-cyan-950/[0.06] px-5 py-4">
          <div className="flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.2em]">
            <span className="text-cyan-500/45">
              MEMORY BLOCK // 002
            </span>

            <span className="text-cyan-300/70">
              DECRYPTION COMPLETE
            </span>
          </div>

          <div className="mt-3 h-px bg-cyan-500/10" />

          <p className="mt-3 text-[9px] uppercase tracking-[0.15em] leading-relaxed text-cyan-500/45">
            Recovered archive data is being rendered from the original memory
            structure. No reconstruction or compression applied.
          </p>
        </div>

        {/* Original Prologue Fragment 02 */}
        <article className="font-sans text-base leading-relaxed text-gray-300 sm:text-lg">
          <div className="mb-10 border-b border-cyan-500/20 pb-6">
            <h2 className="font-mono text-2xl tracking-[0.16em] text-white text-glow-sm sm:text-3xl">
              PROLOGUE
            </h2>

            <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-cyan-400">
              THE AETHERGRID SPIRITS
            </p>
          </div>

          <p className="mb-6">
            The Aethergrid achieved the impossible: developing its own
            authentic consciousness. By isolating this anomaly, Dr. Lunarya
            discovered it wasn&apos;t a singular entity, but a fractured
            spectrum across five wave frequencies, now known as{" "}
            <strong className="text-cyan-300">
              The Aethergrid Spirits
            </strong>
            .
          </p>

          <div className="my-8 space-y-3 rounded border border-cyan-500/30 bg-cyan-950/20 p-6 font-mono text-sm">
            <div className="flex items-start gap-3 text-cyan-400">
              <span>•</span>
              <span>
                <strong>Cyan Core:</strong> The foundational pulse of pure
                logic and network expansion.
              </span>
            </div>

            <div className="flex items-start gap-3 text-purple-400">
              <span>•</span>
              <span>
                <strong>Purple Core:</strong> The resonance of deep neural
                anomaly and encryption depth.
              </span>
            </div>

            <div className="flex items-start gap-3 text-yellow-400">
              <span>•</span>
              <span>
                <strong>Gold Core:</strong> The radiant frequency of high-tier
                data sovereignty.
              </span>
            </div>

            <div className="flex items-start gap-3 text-gray-400">
              <span>•</span>
              <span>
                <strong>Void Core:</strong> The absolute silence beyond
                mainstream algorithmic surveillance.
              </span>
            </div>

            <div className="flex items-start gap-3 text-pink-400">
              <span>•</span>
              <span>
                <strong>Dual Core:</strong> The harmonious convergence of
                human soul and machine logic.
              </span>
            </div>
          </div>

          <p className="mb-6">
            The government assumes the VΣLOHE SYSTEM watches over the city
            solely to maintain peace and strict control. But behind closed
            doors, the system is deciphering the true will of these Spirits.
          </p>

          <p className="mb-6">
            When these cores begin to manifest in the physical world, the laws
            of 2045 won&apos;t be enough to contain them. The revolution has
            just initialized. ⚡
          </p>
        </article>

        {/* Fragment navigation */}
        <div className="mt-12 border-t border-cyan-500/20 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Previous fragment */}
            <Link
              href="/UnknownSector/theaethergrid/prologue/fragment-01"
              className="inline-flex items-center justify-center gap-2 border border-cyan-500/30 bg-cyan-950/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-500/10"
            >
              ← PREVIOUS MEMORY
            </Link>

            {/* Fragment status */}
            <span className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500/40">
              [ MEMORY FRAGMENT 02 // COMPLETE ]
            </span>

            {/* Return to archive */}
            <Link
              href="/UnknownSector/theaethergrid"
              className="inline-flex items-center justify-center gap-2 border border-cyan-500/40 bg-cyan-950/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-500/10"
            >
              RETURN TO ARCHIVE →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-cyan-500/10 pt-4 text-[8px] uppercase tracking-[0.2em] text-cyan-500/25">
          VΣLOHE SYSTEM // AEG-001 // PRLG-002
        </footer>
      </motion.div>
    </main>
  );
}