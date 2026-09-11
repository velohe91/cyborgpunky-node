"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HologramFrame } from "@/components/effects/HologramFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ExpandableLoreCard({
  eyebrow,
  title,
  summary,
  paragraphs,
  children,
  defaultOpen = false,
  tone = "violet",
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  paragraphs: readonly string[];
  children?: ReactNode;
  defaultOpen?: boolean;
  tone?: "cyan" | "violet";
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(defaultOpen);

  const eyebrowClass =
    tone === "violet" ? "text-violet-300/80" : "text-neon-cyan/80";
  const ruleClass =
    tone === "violet" ? "border-violet-400/20" : "border-neon-cyan/15";
  const accentBtn =
    tone === "violet"
      ? "text-violet-300 hover:text-violet-200 focus-visible:ring-violet-400/50"
      : "text-neon-cyan hover:text-neon-blue focus-visible:ring-neon-cyan/60";

  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
    >
      <HologramFrame className="panel rounded-xl p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className={`mb-2 font-mono text-[10px] uppercase tracking-[0.35em] ${eyebrowClass}`}
            >
              {eyebrow}
            </p>
            <h2 className="font-sans text-xl font-semibold tracking-wide text-foreground text-glow-sm sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className={`shrink-0 rounded border border-current/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-1 ${accentBtn}`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Collapse ▴" : "Decrypt ▾"}
          </button>
        </div>

        <p
          className={`mt-3 border-t ${ruleClass} pt-3 font-mono text-xs leading-relaxed text-muted sm:text-sm`}
        >
          {summary}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="body"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 font-mono text-sm leading-relaxed text-muted">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HologramFrame>
    </motion.section>
  );
}
