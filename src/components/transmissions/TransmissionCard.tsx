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
      initial={reduced ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35 }}
    >
      <span
        className="absolute left-0.5 top-4 h-2 w-2 bg-[#FF2CF0]"
        aria-hidden
      />

      <div className="circuit-frame p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className="border border-[#FF2CF0] px-1.5 py-0.5 text-[#FF2CF0]">
            Transmission
          </span>
          <time dateTime={entry.date}>{entry.date}</time>
          <span className="text-muted/40">//</span>
          <span className="text-muted/60">{entry.id}</span>
        </div>

        <h2 className="font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[18px]">
          {entry.title}
        </h2>

        {entry.tags && entry.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="border border-neon-blue/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neon-blue/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-3 font-mono text-[14px] leading-[1.5] text-muted">
          {entry.content}
        </p>
      </div>
    </motion.article>
  );
}
