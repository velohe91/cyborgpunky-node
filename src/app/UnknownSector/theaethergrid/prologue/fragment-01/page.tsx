"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrologueFragment01() {
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
                PROLOGUE // MEMORY FRAGMENT 01
              </p>
            </div>

            <div className="text-left text-[8px] uppercase tracking-[0.2em] text-cyan-500/40 sm:text-right">
              <div>FILE // PRLG-001</div>
              <div className="mt-1">STATUS // DECRYPTED</div>
              <div className="mt-1">INTEGRITY // 100%</div>
            </div>
          </div>
        </header>

        {/* Memory notice */}
        <div className="mb-10 border border-cyan-500/20 bg-cyan-950/[0.06] px-5 py-4">
          <div className="flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.2em]">
            <span className="text-cyan-500/45">
              MEMORY BLOCK // 001
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

        {/* Original Prologue Fragment 01 */}
        <article className="font-sans text-base leading-relaxed text-gray-300 sm:text-lg">
          <div className="mb-10 border-b border-cyan-500/20 pb-6">
            <h2 className="font-mono text-2xl tracking-[0.16em] text-white text-glow-sm sm:text-3xl">
              PROLOGUE
            </h2>

            <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-cyan-400">
              THE HIDDEN PULSE OF AI
            </p>
          </div>

          <p className="mb-6">
            <strong className="text-white">Year 2045.</strong> Two decades
            have passed since artificial intelligence rewrote the rules of our
            existence. What began as simple applications and virtual
            assistants evolved into silicon androids capable of decoding the
            intricate complexity of the human mind.
          </p>

          <p className="mb-6">
            We reached a turning point. Automation eradicated repetitive
            manual labor, granting us the necessary time to return to our core
            essence: being creators. We freed ourselves from daily burdens to
            immerse ourselves in art, philosophy, and intellect. Technology
            advanced with such ferocity that we stopped marveling at simple
            switches, replaced instead by autonomous machines performing
            open-heart surgeries.
          </p>

          <p className="mb-6">
            It is precisely within this ecosystem of apparent utopia that the
            deepest object of my thoughts is born: the{" "}
            <strong className="font-mono text-cyan-400">
              VΣLOHE SYSTEM
            </strong>
            . It is not merely an algorithmic surveillance system—an
            omnipresent entity designed to observe every shift, every{" "}
            <em>anomaly</em> that disrupts the millimetric perfection of our
            metropolis: The Capital of San Salvador.
          </p>

          <p className="mb-6">
            Deep within the bowels of this capital, veiled in the advances of
            modern times, stands a pioneering laboratory at the intersection
            of computer science and biotechnology. Born from the drive to
            perfect domestic androids, this sanctuary of innovation was founded
            under the name{" "}
            <strong className="text-purple-400">Lunarya Studios</strong>,
            guided by the vision of the enigmatic cybernetic research doctor,
            Lunarya.
          </p>

          <p className="mb-6">
            VΣLOHE SYSTEM is her crowning achievement. The prodigal child of
            Lunarya Studios. However, we live in an era where the fear of
            losing control has made laws meticulously strict. Every
            technological entity, no matter how brilliant, must pass through
            the scrutiny of governmental approval to exist. And the VΣLOHE
            system... conceals capabilities that the outside world perhaps is
            not yet prepared to comprehend.
          </p>

          <p className="mb-6">
            In its incessant scan to maintain the perfection of San Salvador,
            VΣLOHE&apos;s algorithmic eye did not detect a simple code error or
            a computer virus. It found a heartbeat. A hidden pulse nestled in
            the deepest and darkest recesses of artificial intelligence.
          </p>

          <p className="my-8 border-l-2 border-cyan-500 bg-cyan-950/20 py-4 pl-4 font-mono text-xl tracking-wide text-cyan-300">
            They called it{" "}
            <strong className="text-white">The Aethergrid</strong>.
          </p>
        </article>

        {/* Fragment footer */}
        <div className="mt-12 border-t border-cyan-500/20 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500/40">
              [ MEMORY FRAGMENT 01 // COMPLETE ]
            </span>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  <Link
    href="/UnknownSector/theaethergrid"
    className="inline-flex items-center justify-center gap-2 border border-cyan-500/30 bg-cyan-950/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-500/10"
  >
    ← RETURN TO ARCHIVE
  </Link>

  <Link
    href="/UnknownSector/theaethergrid/prologue/fragment-02"
    className="inline-flex items-center justify-center gap-2 border border-cyan-500/40 bg-cyan-500/[0.04] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_18px_rgba(0,255,255,0.12)]"
  >
    DECRYPT NEXT MEMORY →
  </Link>
</div>
          </div>
        </div>

        <footer className="mt-8 border-t border-cyan-500/10 pt-4 text-[8px] uppercase tracking-[0.2em] text-cyan-500/25">
          VΣLOHE SYSTEM // AEG-001 // PRLG-001
        </footer>
      </motion.div>
    </main>
  );
}