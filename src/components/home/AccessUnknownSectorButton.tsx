"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AccessUnknownSectorButton() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="mt-4"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 2.25, duration: 0.45 }}
    >
      <NeonButton
        href="/UnknownSector/theaethergrid"
        variant="outline"
        className="min-w-[240px] border-red-500/30 text-red-400/85 hover:border-red-500/60 hover:text-red-300"
      >
        Access Unknown Sector
      </NeonButton>
    </motion.div>
  );
}