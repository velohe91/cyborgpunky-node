"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HologramFrame } from "@/components/effects/HologramFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LoreSection({
  eyebrow,
  title,
  paragraphs,
  children,
  tone = "cyan",
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  children?: ReactNode;
  /** cyan = public index · violet = sealed vault */
  tone?: "cyan" | "violet";
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const eyebrowClass =
    tone === "violet" ? "text-violet-300/80" : "text-neon-cyan/80";
  const ruleClass =
    tone === "violet" ? "border-violet-400/20" : "border-neon-cyan/15";

  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
    >
      <HologramFrame className="panel rounded-xl p-5 sm:p-7">
        <p
          className={`mb-2 font-mono text-[10px] uppercase tracking-[0.35em] ${eyebrowClass}`}
        >
          {eyebrow}
        </p>
        <h2 className="font-sans text-xl font-semibold tracking-wide text-foreground text-glow-sm sm:text-2xl">
          {title}
        </h2>
        <div
          className={`mt-4 space-y-4 border-t ${ruleClass} pt-4 font-mono text-sm leading-relaxed text-muted`}
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {children}
        </div>
      </HologramFrame>
    </motion.section>
  );
}
