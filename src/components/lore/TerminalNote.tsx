"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TerminalNote({
  lines,
  label = "terminal",
  tone = "cyan",
}: {
  lines: readonly string[];
  label?: string;
  tone?: "cyan" | "violet";
}) {
  const reduced = usePrefersReducedMotion();
  const border =
    tone === "violet" ? "border-violet-400/25" : "border-neon-cyan/20";
  const prompt =
    tone === "violet" ? "text-violet-300/50" : "text-neon-cyan/40";
  const text =
    tone === "violet" ? "text-violet-200/85" : "text-neon-cyan/85";

  return (
    <motion.aside
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
      className={`rounded-md border ${border} bg-black/55 px-4 py-3 font-mono shadow-[inset_0_0_24px_rgba(0,240,255,0.04)]`}
      aria-label={label}
    >
      <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-muted/70">
        {`// ${label}`}
      </p>
      <ul className="space-y-1.5 text-xs leading-relaxed sm:text-[13px]">
        {lines.map((line) => (
          <li key={line} className={text}>
            <span className={`mr-1.5 select-none ${prompt}`} aria-hidden>
              &gt;
            </span>
            {line}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
