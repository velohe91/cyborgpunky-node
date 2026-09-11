"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TransmissionArticle } from "@/lib/types";
import { getReadingTimeMinutes } from "@/lib/feed";
import { getNftById } from "@/data/nfts";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Characters roughly shown when collapsed (~3–4 lines of body). */
const COLLAPSE_CHAR_LIMIT = 280;

function paragraphs(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** e.g. VEL-001 + "CBPS-VS-001 // VIREX" → "VEL-001 / VIREX" */
function relatedNftLabel(nftId: string): string {
  const nft = getNftById(nftId);
  if (!nft) return nftId;
  const callsign = nft.title.includes("//")
    ? nft.title.split("//").pop()?.trim()
    : null;
  return callsign ? `${nftId} / ${callsign}` : nftId;
}

export function TransmissionCard({
  entry,
  index,
  onOpenRelatedNft,
}: {
  entry: TransmissionArticle;
  index: number;
  onOpenRelatedNft?: (nftId: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const contentId = useId();
  const minutes = getReadingTimeMinutes(entry.content, entry.readingTimeMinutes);
  const paras = paragraphs(entry.content);
  const fullText = paras.join("\n\n");
  const needsExpand = fullText.length > COLLAPSE_CHAR_LIMIT;
  const [expanded, setExpanded] = useState(false);

  const preview =
    needsExpand && !expanded
      ? fullText.slice(0, COLLAPSE_CHAR_LIMIT).replace(/\s+\S*$/, "") + "…"
      : null;

  return (
    <motion.article
      className="relative pl-8"
      initial={reduced ? false : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.4 }}
    >
      <span
        className="absolute left-0 top-3 h-3 w-3 rounded-full border border-neon-cyan bg-void box-glow"
        aria-hidden
      />

      <div className="panel hologram-border rounded-lg p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider text-muted">
          <span className="rounded border border-violet-400/40 px-1.5 py-0.5 text-[9px] uppercase text-violet-300">
            Transmission
          </span>
          <time dateTime={entry.date}>{entry.date}</time>
          <span className="text-muted/40" aria-hidden>
            {"//"}
          </span>
          <span className="text-neon-cyan/70">{minutes} min read</span>
          <span className="text-muted/50">{entry.id}</span>
        </div>

        <h3 className="font-sans text-base font-semibold tracking-wide text-foreground text-glow-sm sm:text-lg">
          {entry.title}
        </h3>

        {entry.tags && entry.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-neon-blue/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neon-blue/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div
          id={contentId}
          className="mt-3 space-y-3 font-mono text-xs leading-relaxed text-muted sm:text-sm"
        >
          <AnimatePresence initial={false} mode="wait">
            {preview ? (
              <motion.p
                key="preview"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {preview}
              </motion.p>
            ) : (
              <motion.div
                key="full"
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-3"
              >
                {paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {needsExpand && (
            <button
              type="button"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan transition-colors hover:text-neon-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/60"
              aria-expanded={expanded}
              aria-controls={contentId}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Collapse transmission ▴" : "Expand transmission ▾"}
            </button>
          )}

          {entry.relatedNftId && (
            <button
              type="button"
              onClick={() => onOpenRelatedNft?.(entry.relatedNftId!)}
              className="font-mono text-[10px] uppercase tracking-widest text-neon-blue transition-colors hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/60"
            >
              → Related: {relatedNftLabel(entry.relatedNftId)}
            </button>
          )}

          {entry.blogLink && (
            <a
              href={entry.blogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-wide text-muted/70 transition-colors hover:text-neon-cyan/90"
            >
              View original transmission →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
