"use client";

import { motion } from "framer-motion";
import type { SystemBroadcast } from "@/lib/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function paragraphs(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Prominent system-wide broadcast card for the Live Feed.
 * Visually elevated above regular transmissions and logs.
 */
export function BroadcastCard({
  entry,
  index,
}: {
  entry: SystemBroadcast;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const paras = paragraphs(entry.content);

  return (
    <motion.article
      className="relative pl-8"
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.45 }}
    >
      {/* Pulse node on timeline */}
      <span
        className="absolute left-0 top-4 h-2 w-2 bg-[#0CF1FF]"
        aria-hidden
      />

      <div className="circuit-frame relative p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-neon-cyan/10 blur-2xl"
          aria-hidden
        />

        <div className="relative mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider">
          <span className="border-2 border-[#0CF1FF] px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-neon-cyan">
            System Broadcast
          </span>
          <span className="border-2 border-[#FF2CF0] px-1.5 py-0.5 text-[9px] uppercase text-[#FF2CF0]">
            Priority
          </span>
          <time dateTime={entry.date} className="text-muted">
            {entry.date}
          </time>
          <span className="text-muted/50">{entry.id}</span>
        </div>

        <h3 className="relative font-sans text-lg tracking-wide text-[#FF2CF0] sm:text-xl">
          {entry.title}
        </h3>

        <div className="relative mt-4 space-y-3 border-l-2 border-neon-cyan/40 pl-4 font-mono text-[14px] leading-[1.5] text-foreground/90">
          {paras.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {entry.blogLink && (
          <a
            href={entry.blogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-block font-mono text-[10px] tracking-wide text-neon-cyan/80 transition-colors hover:text-neon-cyan"
          >
            View original broadcast →
          </a>
        )}
      </div>
    </motion.article>
  );
}
