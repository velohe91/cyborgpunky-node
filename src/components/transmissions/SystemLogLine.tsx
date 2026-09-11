"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SystemLogEntry } from "@/lib/types";
import { getNftById } from "@/data/nfts";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LEVEL_STYLES: Record<string, string> = {
  INFO: "text-sky-300 border-sky-400/40",
  WARN: "text-amber-300 border-amber-400/40",
  SIGNAL: "text-neon-cyan border-neon-cyan/50",
  LORE: "text-violet-300 border-violet-400/40",
  ERROR: "text-rose-300 border-rose-400/40",
};

const LEVEL_GLOW: Record<string, string> = {
  INFO: "bg-sky-400",
  WARN: "bg-amber-400",
  SIGNAL: "bg-neon-cyan",
  LORE: "bg-violet-400",
  ERROR: "bg-rose-400",
};

const linkClass =
  "inline-flex items-center font-mono text-[10px] uppercase tracking-widest text-neon-blue/90 transition-colors hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/60";

const actionLinkClass = `${linkClass} rounded border border-neon-cyan/30 bg-neon-cyan/5 px-2.5 py-1.5 hover:border-neon-cyan/60 hover:bg-neon-cyan/10`;

function relatedNftLabel(nftId: string): string {
  const nft = getNftById(nftId);
  if (!nft) return nftId;
  const callsign = nft.title.includes("//")
    ? nft.title.split("//").pop()?.trim()
    : null;
  return callsign ? `${nftId} / ${callsign}` : nftId;
}

function MetaBadges({
  entry,
  levelClass,
}: {
  entry: SystemLogEntry;
  levelClass: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] tracking-wider">
      <time className="text-muted/90">{entry.timestamp}</time>
      <span
        className={`rounded border px-1.5 py-0.5 text-[9px] uppercase ${levelClass}`}
      >
        {entry.level}
      </span>
      <span className="text-muted/50">{entry.id}</span>
      {entry.status && (
        <span className="rounded border border-emerald-400/40 px-1.5 py-0.5 text-[9px] uppercase text-emerald-300">
          {entry.status}
        </span>
      )}
      {entry.classification && (
        <span className="rounded border border-sky-400/30 px-1.5 py-0.5 text-[9px] uppercase text-sky-300/90">
          {entry.classification}
        </span>
      )}
    </div>
  );
}

function LogActions({
  entry,
  onOpenRelatedNft,
}: {
  entry: SystemLogEntry;
  onOpenRelatedNft?: (nftId: string) => void;
}) {
  const hasActions =
    entry.marketplace ||
    entry.buyerProfile ||
    entry.collectionLink ||
    entry.relatedNftId ||
    entry.blogLink;
  if (!hasActions) return null;

  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-neon-cyan/10 pt-3">
      {entry.collectionLink && (
        <a
          href={entry.collectionLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} rounded border border-violet-400/40 bg-violet-500/10 px-2.5 py-1.5 text-violet-200 hover:border-violet-300/60 hover:bg-violet-500/15 hover:text-violet-100`}
        >
          Collection →
        </a>
      )}
      {entry.marketplace && (
        <a
          href={entry.marketplace}
          target="_blank"
          rel="noopener noreferrer"
          className={actionLinkClass}
        >
          Marketplace →
        </a>
      )}
      {entry.buyerProfile && (
        <a
          href={entry.buyerProfile}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} rounded border border-neon-blue/30 bg-neon-blue/5 px-2.5 py-1.5 hover:border-neon-cyan/50 hover:bg-neon-blue/10`}
        >
          Buyer profile →
        </a>
      )}
      {entry.relatedNftId && (
        <button
          type="button"
          onClick={() => onOpenRelatedNft?.(entry.relatedNftId!)}
          className={linkClass}
        >
          → Related: {relatedNftLabel(entry.relatedNftId)}
        </button>
      )}
      {entry.blogLink && (
        <a
          href={entry.blogLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[10px] tracking-wide text-muted/70 transition-colors hover:text-neon-cyan/90"
        >
          Original log →
        </a>
      )}
    </div>
  );
}

/**
 * Terminal / dossier card for a system log.
 * Logs with `image` use a two-column archive layout (image left, record right).
 * Text-only logs keep a compact terminal stack.
 */
export function SystemLogLine({
  entry,
  index,
  onOpenRelatedNft,
}: {
  entry: SystemLogEntry;
  index: number;
  onOpenRelatedNft?: (nftId: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const levelClass = LEVEL_STYLES[entry.level] ?? LEVEL_STYLES.INFO;
  const nodeClass = LEVEL_GLOW[entry.level] ?? LEVEL_GLOW.INFO;
  const hasImage = Boolean(entry.image);

  return (
    <motion.article
      className="relative pl-8"
      initial={reduced ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
    >
      <span
        className={`absolute left-0.5 top-3 h-2.5 w-2.5 rounded-full border border-void ${nodeClass} opacity-90 box-glow`}
        aria-hidden
      />

      <div
        className={`overflow-hidden rounded-md border border-neon-cyan/20 bg-black/55 font-mono shadow-[inset_0_0_28px_rgba(0,240,255,0.05)] ${
          hasImage
            ? "hologram-border box-glow"
            : "border-neon-cyan/15 px-3 py-2.5"
        }`}
      >
        {hasImage ? (
          /* ── Dossier card: image left · record right (stack on mobile) ── */
          <div className="flex flex-col sm:flex-row">
            {/* Still frame — 1:1 square */}
            <div className="relative mx-auto aspect-square w-full max-w-[280px] shrink-0 border-b border-neon-cyan/15 bg-void sm:mx-0 sm:w-[200px] sm:max-w-none sm:border-b-0 sm:border-r sm:border-neon-cyan/15 md:w-[220px]">
              <Image
                src={entry.image!}
                alt={entry.title ?? entry.id}
                fill
                unoptimized
                sizes="(max-width: 640px) 280px, 220px"
                className="object-cover object-center"
              />
              {/* Scan corner accents */}
              <span
                className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l border-t border-neon-cyan/50"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b border-r border-neon-cyan/50"
                aria-hidden
              />
            </div>

            {/* Record body */}
            <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
              <MetaBadges entry={entry} levelClass={levelClass} />

              {entry.title && (
                <h3 className="text-sm font-medium leading-snug tracking-wide text-foreground sm:text-[15px]">
                  {entry.title}
                </h3>
              )}

              {entry.gallery && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300/85">
                  Gallery // {entry.gallery}
                </p>
              )}

              {entry.systemArchitect && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Architect // {entry.systemArchitect}
                </p>
              )}

              <p className="whitespace-pre-line text-[11px] leading-relaxed text-neon-cyan/90 sm:text-xs">
                <span className="mr-1 select-none text-neon-cyan/35" aria-hidden>
                  &gt;
                </span>
                {entry.message}
              </p>

              <LogActions entry={entry} onOpenRelatedNft={onOpenRelatedNft} />
            </div>
          </div>
        ) : (
          /* ── Compact terminal line (no image) ── */
          <>
            <MetaBadges entry={entry} levelClass={levelClass} />

            {entry.title && (
              <h3 className="mt-1.5 text-[11px] font-medium tracking-wide text-foreground/90 sm:text-xs">
                {entry.title}
              </h3>
            )}

            {entry.gallery && (
              <p className="mt-1 text-[10px] uppercase tracking-widest text-violet-300/80">
                Gallery // {entry.gallery}
              </p>
            )}

            {entry.systemArchitect && (
              <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">
                Architect // {entry.systemArchitect}
              </p>
            )}

            <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-neon-cyan/90 sm:text-[13px]">
              <span className="mr-1.5 select-none text-neon-cyan/40" aria-hidden>
                &gt;
              </span>
              {entry.message}
            </p>

            <LogActions entry={entry} onOpenRelatedNft={onOpenRelatedNft} />
          </>
        )}
      </div>
    </motion.article>
  );
}
