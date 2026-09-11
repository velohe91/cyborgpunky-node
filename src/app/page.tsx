"use client";

import { GlowOrb } from "@/components/effects/GlowOrb";
import { AnimatedLogo } from "@/components/home/AnimatedLogo";
import { SystemBootSequence } from "@/components/home/SystemBootSequence";
import { EnterArchiveButton } from "@/components/home/EnterArchiveButton";
import { PlayGameButton } from "@/components/home/PlayGameButton";
import { SITE_TAGLINE } from "@/lib/constants";
import { motion } from "framer-motion";

/**
 * Landing — boot sequence + cinematic entry into the archive.
 */
export default function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-6.75rem)] flex-col items-center justify-center overflow-visible px-4 py-16">
      <GlowOrb className="-left-20 top-20 h-72 w-72" color="magenta" />
      <GlowOrb className="-right-16 bottom-24 h-80 w-80" color="cyan" />
      <GlowOrb className="bottom-10 left-1/3 h-56 w-56" color="gold" />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center text-center">
        <motion.p
          className="mb-6 font-mono text-[13.5pt] leading-[1.55] uppercase tracking-[0.45em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {SITE_TAGLINE}
        </motion.p>

        <AnimatedLogo />

        <motion.p
          className="mt-6 max-w-2xl font-mono text-[13.5pt] leading-[1.55] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Cryogenic vault. Compressed genesis identities and activated
          CyborgPunk states — held in stasis.
        </motion.p>

        <SystemBootSequence />
        <EnterArchiveButton />
        <PlayGameButton />
      </div>
    </section>
  );
}
