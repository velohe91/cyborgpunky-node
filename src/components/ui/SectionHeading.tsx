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
      className="mb-5 max-w-3xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-[13px] leading-[1.5] uppercase tracking-[0.2em] text-neon-cyan sm:text-[14px]">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-full font-sans text-[18px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[22px] md:text-[26px]">
        {title}
      </h1>
      <div className="circuit-crosshair my-2 h-0 w-40 border-t-2 border-[#0CF1FF]" />
      {subtitle && (
        <p className="mt-3 font-mono text-[14px] leading-[1.5] text-muted">
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
