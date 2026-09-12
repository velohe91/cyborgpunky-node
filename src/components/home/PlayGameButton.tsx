"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PlayGameButton() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 1.55, duration: 0.4 }}
    >
      <NeonButton href="/arcade" variant="outline">
        Arcade
      </NeonButton>
    </motion.div>
  );
}
