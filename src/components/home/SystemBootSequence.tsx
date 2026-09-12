"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LINES = [
  { text: "> CRYOGENIC SYSTEM ACTIVATED", delay: 0.4 },
  { text: "> SYSTEM ONLINE", delay: 0.9 },
];

export function SystemBootSequence() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="circuit-frame mx-auto mt-4 w-full max-w-lg px-3 py-2 text-left font-mono text-[14px] leading-[1.5]"
      role="status"
      aria-live="polite"
    >
      {LINES.map((line) => (
        <motion.p
          key={line.text}
          className={
            line.text.includes("ONLINE") ? "text-neon-cyan" : "text-muted"
          }
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reduced ? 0 : line.delay, duration: 0.35 }}
        >
          {line.text}
        </motion.p>
      ))}
      <motion.span
        className="mt-1 inline-block h-4 w-2 bg-neon-cyan align-middle"
        animate={reduced ? undefined : { opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        aria-hidden
      />
    </div>
  );
}
