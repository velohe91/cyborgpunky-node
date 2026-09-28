"use client";

import { motion } from "framer-motion";
import type { TransmissionArticle } from "@/lib/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TransmissionCard({
  entry,
  index,
}: {
  entry: TransmissionArticle;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.article
      className="relative pl-8"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.35 }}
    >
      <span
        className="absolute left-0 top-5 h-3 w-3 border border-[#FF2CF0] bg-[#05010d] shadow-[0_0_8px_rgba(255,44,240,0.65)]"
        aria-hidden
      />

      <div className="circuit-frame p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-[#FF2CF0]">SIGNAL RECEIVED</span>
          <span className="text-muted/30">///</span>
          <time dateTime={entry.date} className="text-muted">
            {entry.date}
          </time>
          <span className="text-muted/30">///</span>
          <span className="text-neon-blue/70">{entry.id}</span>
        </div>

        <h2 className="font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[18px]">
          {entry.title}
        </h2>

        <p className="mt-3 max-w-3xl font-mono text-[14px] leading-[1.55] text-muted">
          {entry.content}
        </p>

        {entry.tags && entry.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="border border-neon-blue/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neon-blue/70"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
