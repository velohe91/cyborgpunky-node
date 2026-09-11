"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HERO_LINES = ["CYBORGPUNKS", "CLUB"] as const;

/**
 * Home wordmark — two centered lines, Press Start 2P, no clip.
 */
export function AnimatedLogo() {
  const reduced = usePrefersReducedMotion();
  let letterIndex = 0;

  return (
    <h1
      className="home-wordmark font-sans w-full max-w-full select-none overflow-visible px-4 text-center uppercase text-neon-cyan"
      style={{
        fontFamily:
          "var(--font-press-start), ui-sans-serif, system-ui, sans-serif",
        letterSpacing: "0.08em",
        lineHeight: 1.15,
        textShadow:
          "0 0 1px rgba(12, 241, 255, 0.95), 0 0 10px rgba(12, 241, 255, 0.45), 0 0 28px rgba(219, 63, 253, 0.28)",
      }}
      aria-label="CYBORGPUNKS CLUB"
    >
      {HERO_LINES.map((word) => (
        <span key={word} className="block w-full">
          {word.split("").map((char) => {
            const i = letterIndex++;
            return (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block"
                initial={
                  reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: reduced ? 0 : 0.035 * i,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
