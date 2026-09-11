"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  gameWhitepaperMeta,
  gameWhitepaperSections,
} from "@/data/game-whitepaper";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Full Game Protocol whitepaper — immersive long-form sections.
 */
export function GameWhitepaperView() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <GlowOrb className="left-0 top-32 h-56 w-56 opacity-60" color="cyan" />
      <GlowOrb
        className="right-0 bottom-40 h-64 w-64 opacity-50"
        color="blue"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/game"
          className="mb-6 inline-flex font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-neon-cyan"
        >
          ← Game Protocol
        </Link>

        {/* Hero */}
        <motion.header
          className="panel hologram-border mb-10 rounded-xl p-6 sm:p-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/75">
            Document // {gameWhitepaperMeta.version}
          </p>
          <h1 className="mt-3 font-sans text-2xl font-semibold tracking-wide text-neon-cyan text-glow-sm sm:text-3xl md:text-4xl">
            {gameWhitepaperMeta.title}
          </h1>
          <p className="mt-3 font-mono text-sm text-muted sm:text-base">
            {gameWhitepaperMeta.tagline}
          </p>
          <p className="mt-4 inline-flex rounded border border-emerald-400/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-300">
            {gameWhitepaperMeta.status}
          </p>
        </motion.header>

        {/* Table of contents */}
        <nav
          aria-label="Whitepaper sections"
          className="mb-10 rounded-lg border border-neon-cyan/15 bg-black/40 p-4 font-mono"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-neon-cyan/70">
            Index // Sections
          </p>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {gameWhitepaperSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded px-2 py-1 text-[11px] text-muted transition-colors hover:bg-neon-cyan/5 hover:text-neon-cyan"
                >
                  <span className="text-neon-cyan/50">{s.number}</span>{" "}
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {gameWhitepaperSections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-lg border border-neon-cyan/15 bg-black/45 p-5 sm:p-6"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.02, 0.2), duration: 0.35 }}
            >
              <header className="mb-4 border-b border-neon-cyan/10 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/60">
                  Section // {section.number}
                </p>
                <h2 className="mt-1 font-sans text-lg font-semibold tracking-wide text-foreground sm:text-xl">
                  {section.number} — {section.title}
                </h2>
              </header>

              <div className="space-y-3 font-mono text-xs leading-relaxed text-muted sm:text-sm">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-neon-cyan/10 pt-4 font-mono text-[11px] text-neon-cyan/85 sm:text-xs">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="shrink-0 text-neon-cyan/40" aria-hidden>
                        &gt;
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-neon-cyan/15 pt-10 sm:flex-row">
          <NeonButton href="/game" variant="outline" className="min-w-[200px]">
            ← Game Protocol
          </NeonButton>
          <NeonButton href="/" variant="ghost" className="min-w-[200px]">
            Return to Archive
          </NeonButton>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60">
          End of document // Awaiting further system directives
        </p>
      </div>
    </div>
  );
}
