"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Empty-state panel for the VeLozArt wing until assets are indexed.
 */
export function VelozArtPlaceholder() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="panel hologram-border mx-auto max-w-2xl rounded-xl p-8 text-center sm:p-10"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-violet-300/80">
        Sector // VeLozArt
      </p>
      <h2 className="mt-3 font-sans text-xl font-semibold tracking-wide text-violet-200 sm:text-2xl">
        No assets indexed
      </h2>
      <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
        This wing is reserved for the VeLozArt AI collection. The channel is on
        standby — works will appear here once the catalog is linked to the
        Exhibition System.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <NeonButton href="/gallery" variant="outline">
          ← Gallery hub
        </NeonButton>
        <NeonButton href="/gallery/archive" variant="ghost">
          Open Archive
        </NeonButton>
      </div>
    </motion.div>
  );
}
