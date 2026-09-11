"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-[13.5pt] leading-[1.55] uppercase tracking-[0.35em] text-neon-cyan/80">
          {eyebrow}
        </p>
      )}
      <h1 className="font-sans text-lg tracking-wide text-glow sm:text-xl md:text-2xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 font-mono text-[13.5pt] leading-[1.55] text-muted">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
