"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ChaptersArchive() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] px-4 py-8 font-mono text-cyan-400 sm:px-6 md:px-12 md:py-12">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.72)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <header className="mb-10 border-b border-cyan-500/20 pb-6">
          <div className="text-[9px] uppercase tracking-[0.4em] text-cyan-500/50">
            VΣLOHE SYSTEM // RECOVERED DIRECTORY
          </div>

          <h1 className="mt-3 text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-3xl">
            CHAPTER ARCHIVE
          </h1>

          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-cyan-500/60">
            Narrative memory structures recovered from the Aethergrid archive.
            Access remains subject to system clearance.
          </p>
        </header>

        <div className="space-y-4">
          <Link
            href="/UnknownSector/theaethergrid/chapters/chapter-01"
            className="group block border border-cyan-500/30 bg-cyan-950/[0.06] p-5 transition-all duration-300 hover:border-cyan-400/70 hover:bg-cyan-500/[0.04] hover:shadow-[0_0_30px_rgba(0,220,255,0.08)]"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-500/45">
                  CHAPTER // 01
                </div>

                <h2 className="mt-2 text-lg font-semibold uppercase tracking-[0.15em] text-white">
                  THE PULSE INITIALIZATION
                </h2>

                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-cyan-500/50">
                  STATUS // AVAILABLE
                </p>
              </div>

              <span className="inline-flex items-center justify-center border border-cyan-500/40 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition group-hover:border-cyan-300 group-hover:bg-cyan-500/10">
                ACCESS FILE →
              </span>
            </div>
          </Link>

          <div className="border border-cyan-500/10 bg-black/30 p-5 opacity-60">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-500/30">
                  CHAPTER // 02
                </div>

                <h2 className="mt-2 text-lg font-semibold uppercase tracking-[0.15em] text-white/60">
                  CLASSIFIED
                </h2>

                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-cyan-500/30">
                  STATUS // LOCKED
                </p>
              </div>

              <span className="border border-cyan-500/10 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-cyan-500/30">
                ENCRYPTED
              </span>
            </div>
          </div>

          <div className="border border-cyan-500/10 bg-black/30 p-5 opacity-60">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-500/30">
                  CHAPTER // 03
                </div>

                <h2 className="mt-2 text-lg font-semibold uppercase tracking-[0.15em] text-white/60">
                  CLASSIFIED
                </h2>

                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-cyan-500/30">
                  STATUS // LOCKED
                </p>
              </div>

              <span className="border border-cyan-500/10 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-cyan-500/30">
                ENCRYPTED
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cyan-500/15 pt-5">
          <Link
            href="/UnknownSector/theaethergrid"
            className="text-[9px] uppercase tracking-[0.2em] text-cyan-500/50 transition hover:text-cyan-300"
          >
            ← RETURN TO ARCHIVE
          </Link>
        </div>

        <footer className="mt-8 border-t border-cyan-500/10 pt-4 text-[8px] uppercase tracking-[0.2em] text-cyan-500/25">
          VΣLOHE SYSTEM // NARRATIVE ARCHIVE
        </footer>
      </motion.div>
    </main>
  );
}