"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type ArchiveState = "recovering" | "directory" | "prologue";

type MemoryStatus = "available" | "encrypted";

const MEMORY_FRAGMENTS = [
  {
    id: "001",
    title: "MEMORY FRAGMENT 01",
    classification: "PROLOGUE // INITIAL SIGNAL",
    status: "available" as MemoryStatus,
  },
  {
    id: "002",
    title: "MEMORY FRAGMENT 02",
    classification: "PROLOGUE // THE CORES",
    status: "encrypted" as MemoryStatus,
  },
];

const RECOVERY_LOGS = [
  "INITIALIZING ARCHIVE HANDSHAKE...",
  "ESTABLISHING SECURE OBSERVER CHANNEL...",
  "LOCATING RECOVERED DATA NODE...",
  "VERIFYING MEMORY SIGNATURE...",
  "RECONSTRUCTING ARCHIVE HEADER...",
  "DECRYPTING RESTRICTED DIRECTORY...",
];

export default function AethergridSector() {
  const [archiveState, setArchiveState] =
    useState<ArchiveState>("recovering");

  const [progress, setProgress] = useState(8);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (archiveState !== "recovering") return;

    let current = 8;

    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 5) + 2;

      if (current >= 99) {
        current = 99;
        window.clearInterval(interval);

        window.setTimeout(() => {
          setProgress(100);

          window.setTimeout(() => {
            setArchiveState("directory");
          }, 700);
        }, 1400);
      }

      setProgress(current);

      const nextLog = Math.min(
        Math.floor(current / 17),
        RECOVERY_LOGS.length - 1,
      );

      setLogIndex(nextLog);
    }, 180);

    return () => window.clearInterval(interval);
  }, [archiveState]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] px-4 py-8 font-mono text-cyan-400 sm:px-6 md:px-12 md:py-12">
      {/* Atmospheric scanlines */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

      {/* Ambient grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(0,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.25)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col">
        {/* System header */}
        <header className="flex items-start justify-between border-b border-cyan-500/20 pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-500/60">
              VΣLOHE SYSTEM
            </div>

            <div className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              UNKNOWN SECTOR
            </div>
          </div>

          <div className="text-right text-[9px] uppercase tracking-[0.2em] text-cyan-500/50">
            <div>NODE // AEG-001</div>
            <div className="mt-1">ACCESS // PARTIAL</div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {archiveState === "recovering" && (
            <motion.section
              key="recovering"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 items-center justify-center py-16"
            >
              <div className="w-full max-w-3xl">
                <div className="mb-8">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-red-400">
                    SYSTEM WARNING
                  </div>

                  <h1 className="mt-3 text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl">
                    Encrypted Archive Detected
                  </h1>

                  <p className="mt-3 max-w-2xl text-xs leading-relaxed text-cyan-500/60">
                    An unrecovered archive node has been located beyond the
                    registered Game Protocol sectors.
                  </p>
                </div>

                <div className="space-y-4 border border-cyan-500/20 bg-cyan-950/[0.08] p-5 shadow-[0_0_35px_rgba(0,220,255,0.05)]">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em]">
                    <span className="text-cyan-500/50">
                      ARCHIVE RECOVERY
                    </span>

                    <span className="text-cyan-300">
                      {progress.toString().padStart(3, "0")}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden border border-cyan-500/20 bg-black/70 p-[1px]">
                    <motion.div
                      className="h-full bg-cyan-400 shadow-[0_0_14px_rgba(0,255,255,0.8)]"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  <div className="min-h-5 text-[10px] uppercase tracking-[0.18em] text-cyan-400">
                    &gt; {RECOVERY_LOGS[logIndex]}
                  </div>
                </div>

                <div className="mt-5 flex justify-between text-[8px] uppercase tracking-[0.2em] text-cyan-500/35">
                  <span>ENCRYPTION // ACTIVE</span>
                  <span>MEMORY INTEGRITY // UNKNOWN</span>
                </div>
              </div>
            </motion.section>
          )}

          {archiveState === "directory" && (
            <motion.section
              key="directory"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 py-10"
            >
              <div className="mb-8">
                <div className="text-[9px] uppercase tracking-[0.35em] text-cyan-500/50">
                  ARCHIVE RECOVERY // COMPLETE
                </div>

                <h1 className="mt-3 text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-3xl">
                  Recovered Directory
                </h1>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-cyan-500/60">
                  Partial archive recovered. Some memory structures remain
                  encrypted and require progressive decryption.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Prologue */}
                <button
                  type="button"
                  onClick={() => setArchiveState("prologue")}
                  className="group text-left"
                >
                  <div className="h-full border border-cyan-500/30 bg-cyan-950/[0.08] p-5 transition-all duration-300 hover:border-cyan-400/70 hover:bg-cyan-500/[0.05] hover:shadow-[0_0_30px_rgba(0,220,255,0.08)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-cyan-500/50">
                        DIRECTORY
                      </span>

                      <span className="text-[9px] text-cyan-300">
                        AVAILABLE
                      </span>
                    </div>

                    <h2 className="mt-6 text-lg font-semibold tracking-[0.15em] text-white">
                      /PROLOGUE
                    </h2>

                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cyan-400/60">
                      02 MEMORY FRAGMENTS
                    </p>

                    <div className="mt-8 border-t border-cyan-500/15 pt-4 text-[9px] uppercase tracking-[0.18em] text-cyan-500/50">
                      ACCESS ARCHIVE →
                    </div>
                  </div>
                </button>

                {/* Chapters */}
<Link
  href="/UnknownSector/theaethergrid/chapters"
  className="group block border border-cyan-500/30 bg-cyan-950/[0.06] p-5 transition-all duration-300 hover:border-cyan-400/70 hover:bg-cyan-500/[0.05] hover:shadow-[0_0_30px_rgba(0,220,255,0.08)]"
>
  <div className="flex items-center justify-between">
    <span className="text-[9px] uppercase tracking-[0.25em] text-cyan-500/50">
      DIRECTORY
    </span>

    <span className="text-[9px] text-cyan-300">
      AVAILABLE
    </span>
  </div>

  <h2 className="mt-6 text-lg font-semibold tracking-[0.15em] text-white">
    /CHAPTERS
  </h2>

  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cyan-400/60">
    NARRATIVE ARCHIVE
  </p>

  <div className="mt-8 border-t border-cyan-500/15 pt-4 text-[9px] uppercase tracking-[0.18em] text-cyan-500/50">
    ACCESS DIRECTORY →
  </div>
</Link>

                {/* Unknown data */}
                <div className="border border-red-500/15 bg-red-950/[0.03] p-5 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-red-500/40">
                      DIRECTORY
                    </span>

                    <span className="text-[9px] text-red-400/60">
                      ENCRYPTED
                    </span>
                  </div>

                  <h2 className="mt-6 text-lg font-semibold tracking-[0.15em] text-white/50">
                    /UNKNOWN_DATA
                  </h2>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-red-500/35">
                    CLASSIFICATION // UNKNOWN
                  </p>

                  <div className="mt-8 border-t border-red-500/10 pt-4 text-[9px] uppercase tracking-[0.18em] text-red-500/30">
                    DECRYPTION REQUIRED
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-cyan-500/15 pt-5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-500/35">
                  RECOVERED FILES // 01
                </span>

                <Link
                  href="/UnknownSector/theaethergrid"
                  className="text-[9px] uppercase tracking-[0.2em] text-cyan-500/60 transition hover:text-cyan-300"
                >
                  ← RETURN TO ARCHIVE
                </Link>
              </div>
            </motion.section>
          )}

          {archiveState === "prologue" && (
            <motion.section
              key="prologue"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 py-10"
            >
              <div className="mb-8 flex items-end justify-between border-b border-cyan-500/20 pb-5">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.35em] text-cyan-500/50">
                    ARCHIVE // PROLOGUE
                  </div>

                  <h1 className="mt-3 text-2xl font-semibold uppercase tracking-[0.18em] text-white">
                    Memory Structure
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => setArchiveState("directory")}
                  className="text-[9px] uppercase tracking-[0.2em] text-cyan-500/50 transition hover:text-cyan-300"
                >
                  ← DIRECTORY
                </button>
              </div>

              <div className="space-y-4">
                {MEMORY_FRAGMENTS.map((fragment) => {
                  const available = fragment.status === "available";

                  return (
                    <div
                      key={fragment.id}
                      className={`border p-5 transition-all ${
                        available
                          ? "border-cyan-500/30 bg-cyan-950/[0.06] hover:border-cyan-400/60"
                          : "border-cyan-500/10 bg-black/30 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.3em] text-cyan-500/40">
                            MEMORY // {fragment.id}
                          </div>

                          <h2 className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-white">
                            {fragment.title}
                          </h2>

                          <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-cyan-500/50">
                            {fragment.classification}
                          </p>
                        </div>

                        {available ? (
                          <Link
  href="/UnknownSector/theaethergrid/prologue/fragment-01"
  className="inline-flex items-center justify-center border border-cyan-500/40 bg-cyan-950/20 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-500/10"
>
  DECRYPT MEMORY →
</Link>
                        ) : (
                          <span className="inline-flex items-center justify-center border border-cyan-500/10 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-cyan-500/30">
                            ENCRYPTED
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-cyan-500/15 pt-5 text-[9px] uppercase tracking-[0.2em] text-cyan-500/35">
                MEMORY INTEGRITY // PARTIAL
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="border-t border-cyan-500/10 pt-4 text-[8px] uppercase tracking-[0.2em] text-cyan-500/25">
          VΣLOHE SYSTEM // RECOVERED ARCHIVE // AEG-001
        </footer>
      </div>
    </main>
  );
}