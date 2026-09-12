"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { NftItem } from "@/lib/types";
import { RARITY_COLORS } from "@/lib/constants";
import { isCpcPilot } from "@/lib/pilot";
import { useLockedPilot } from "@/hooks/useLockedPilot";

type Props = {
  nft: NftItem | null;
  onClose: () => void;
};

type MediaMode = "still" | "motion";

/** Classify optional motion asset: GIF uses <img>, MP4/WebM use <video>. */
function getMotionKind(src?: string): "gif" | "video" | null {
  if (!src) return null;
  if (/\.gif(\?|#|$)/i.test(src)) return "gif";
  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(src)) return "video";
  // Unknown extension — try as video for archive compatibility
  return "video";
}

/**
 * Accessible lore modal: Esc / backdrop / close button, focus return, scroll lock.
 * Portaled to document.body so it escapes main/nav stacking contexts.
 *
 * Media:
 * - `image` (.jpg/.png) = still frame (grid + modal “Still”)
 * - `video` (.gif) = animated loop via <img>
 * - `video` (.mp4/…) = HTML5 video with image as poster
 */
export function NftModal({ nft, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const router = useRouter();
  const { pilotId, lockPilot } = useLockedPilot();
  const [mounted, setMounted] = useState(false);
  const [mediaMode, setMediaMode] = useState<MediaMode>("motion");
  const isCpc = Boolean(nft && isCpcPilot(nft.id));
  const locked = Boolean(nft && isCpc && pilotId === nft.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!nft) return;

    // Prefer animated media when a motion asset exists
    setMediaMode(nft.video ? "motion" : "still");

    const prev = document.activeElement as HTMLElement | null;
    // Always open scrolled to the top (title / media first).
    // Focus Close with preventScroll so the browser does not jump to the footer.
    const focusTimer = window.setTimeout(() => {
      contentRef.current && (contentRef.current.scrollTop = 0);
      dialogRef.current && (dialogRef.current.scrollTop = 0);
      closeRef.current?.focus({ preventScroll: true });
    }, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [nft, onClose]);

  if (!mounted) return null;

  const rarityClass = nft
    ? RARITY_COLORS[nft.rarity] ?? RARITY_COLORS.common
    : "";
  const motionKind = nft ? getMotionKind(nft.video) : null;
  const showMotion = Boolean(nft?.video) && mediaMode === "motion";

  return createPortal(
    <AnimatePresence>
      {nft && (
        <motion.div
          key={nft.id}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          {/* Backdrop — click outside to close */}
          <button
            type="button"
            className="absolute inset-0 bg-black/90"
            aria-label="Close modal"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`circuit-frame relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden bg-[#05010a] ${
              locked ? "pilot-locked" : ""
            }`}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid min-h-0 gap-0 md:grid-cols-2">
              {/* Media: still (image) + optional motion (gif / mp4) */}
              <div className="relative aspect-square shrink-0 bg-void cyber-grid md:min-h-[320px]">
                {showMotion && motionKind === "gif" && nft.video ? (
                  // GIF must use <img> — <video> cannot play animated GIFs
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={nft.video}
                    src={nft.video}
                    alt={`${nft.title} — animation`}
                    className="absolute inset-0 h-full w-full object-cover pixelated"
                  />
                ) : showMotion && motionKind === "video" && nft.video ? (
                  <video
                    key={nft.video}
                    src={nft.video}
                    poster={nft.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover pixelated"
                    aria-label={`${nft.title} — video`}
                  />
                ) : (
                  <Image
                    key={nft.image}
                    src={nft.image}
                    alt={`${nft.title} — still`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover pixelated"
                    priority
                  />
                )}

                {/* Still / Motion toggle when both assets exist */}
                {nft.video && (
                  <div
                    className="absolute bottom-3 left-3 z-10 flex gap-1 border-2 border-[#0CF1FF] bg-black p-0.5 font-sans text-[8px] uppercase tracking-wider"
                    role="group"
                    aria-label="Media mode"
                  >
                    <button
                      type="button"
                      onClick={() => setMediaMode("still")}
                      className={`px-2 py-1 transition-colors ${
                        mediaMode === "still"
                          ? "bg-[#0CF1FF]/20 text-neon-cyan"
                          : "text-muted hover:text-[#FF2CF0]"
                      }`}
                      aria-pressed={mediaMode === "still"}
                    >
                      Still
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaMode("motion")}
                      className={`px-2 py-1 transition-colors ${
                        mediaMode === "motion"
                          ? "bg-[#FF2CF0]/20 text-[#FF2CF0]"
                          : "text-muted hover:text-neon-cyan"
                      }`}
                      aria-pressed={mediaMode === "motion"}
                    >
                      Motion
                    </button>
                  </div>
                )}
              </div>

              <div
                ref={contentRef}
                key={`scroll-${nft.id}`}
                className="flex min-h-0 max-h-[50dvh] flex-col overflow-y-auto p-5 sm:max-h-none sm:p-6 md:max-h-[70dvh]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs tracking-widest text-neon-cyan">
                    {nft.id}
                  </span>
                  <span
                    className={`border-2 bg-black px-2 py-0.5 font-sans text-[8px] uppercase ${rarityClass}`}
                  >
                    {nft.rarity}
                  </span>
                </div>

                <h2
                  id={titleId}
                  className="max-w-full font-sans text-[16px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[18px]"
                >
                  {nft.title}
                </h2>

                <p className="mt-2 font-mono text-[14px] leading-[1.5] text-muted">
                  {nft.description}
                </p>

                <dl className="mt-3 grid grid-cols-2 gap-2 font-mono text-[14px] leading-[1.5] text-muted">
                  {nft.series && (
                    <>
                      <dt className="text-neon-cyan/70">Series</dt>
                      <dd>{nft.series}</dd>
                    </>
                  )}
                  {nft.status && (
                    <>
                      <dt className="text-neon-cyan/70">System Phase</dt>
                      <dd>{nft.status}</dd>
                    </>
                  )}
                  {nft.year && (
                    <>
                      <dt className="text-neon-cyan/70">Year</dt>
                      <dd>{nft.year}</dd>
                    </>
                  )}
                </dl>

                <div className="circuit-crosshair mt-5 border-t-2 border-[#FF2CF0]/50 pt-4">
                  <p className="mb-2 font-mono text-[14px] leading-[1.5] uppercase tracking-[0.3em] text-neon-cyan/80">
                    Lore
                  </p>
                  <p className="whitespace-pre-line font-mono text-[14px] leading-[1.5] text-foreground/90">
                    {nft.lore}
                  </p>
                </div>

                {nft.tags && nft.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {nft.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-2 border-[#0CF1FF]/40 px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {isCpc && (
                    <button
                      type="button"
                      className="hud-chip w-full sm:w-auto"
                      onClick={() => {
                        lockPilot(nft.id);
                        router.push("/arcade");
                      }}
                    >
                      Set as Pilot
                    </button>
                  )}
                  {nft.marketplace && (
                    <a
                      href={nft.marketplace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hud-chip w-full sm:w-auto"
                    >
                      OpenSea
                    </a>
                  )}
                  {nft.objkt && (
                    <a
                      href={nft.objkt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hud-chip hud-chip-outline w-full sm:w-auto"
                    >
                      Objkt
                    </a>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="hud-chip hud-chip-outline w-full sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
