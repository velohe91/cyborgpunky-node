"use client";

import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Home wordmark — Orbitron SemiBold, single-line, refined neon cyan.
 * Σ uses the same relative size as the other letters (no optical shrink).
 */
export function AnimatedLogo() {
  const reduced = usePrefersReducedMotion();
  const letters = SITE_NAME.split("");

  return (
    <h1
      className="font-sans select-none whitespace-nowrap text-center font-semibold text-neon-cyan"
      style={{
        fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui, sans-serif",
        fontWeight: 600,
        // Balanced, compact display size — full phrase stays on one line
        fontSize: "clamp(0.95rem, 2.4vw, 1.35rem)",
        letterSpacing: "0.28em",
        lineHeight: 1.2,
        // Sharp, refined neon cyan glow
        textShadow:
          "0 0 1px rgba(0, 240, 255, 0.95), 0 0 6px rgba(0, 240, 255, 0.55), 0 0 14px rgba(0, 163, 255, 0.28)",
      }}
      aria-label={SITE_NAME}
    >
      {letters.map((char, i) => {
        const isSpace = char === " ";

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
            style={
              isSpace
                ? {
                    // Word gap between VΣLOHE and SYSTEM (keeps one line)
                    width: "0.65em",
                    display: "inline-block",
                    letterSpacing: 0,
                  }
                : undefined
            }
          >
            {isSpace ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </h1>
  );
}
