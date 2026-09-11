"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type ArchiveModalData = {
  id: string;
  name: string;
  description: string;
  image?: string;
  video?: string;
  classification?: string;
  status?: string;
  metrics?: string;
  accentClass?: string;
};

type Props = {
  item: ArchiveModalData | null;
  onClose: () => void;
};

export default function ArchiveModal({ item, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!item) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus({ preventScroll: true });
      dialogRef.current?.scrollTo(0, 0);
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      previousActiveElement?.focus?.();
    };
  }, [item, onClose]);

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key={item.id}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close archive file"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-cyan-500/30 bg-[#060911] shadow-[0_0_40px_rgba(0,255,255,0.12)] sm:rounded-xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
            }}
          >
            <div className="grid min-h-0 gap-0 md:grid-cols-2">
              {/* Media */}
              <div className="relative flex aspect-square shrink-0 items-center justify-center overflow-hidden bg-black cyber-grid md:min-h-[320px]">
                {item.video ? (
                  <video
                    key={item.video}
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-contain"
                    aria-label={`${item.name} — video`}
                  />
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                ) : (
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500/40">
                    NO MEDIA AVAILABLE
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />
              </div>

              {/* Information */}
              <div className="flex min-h-0 max-h-[50dvh] flex-col overflow-y-auto p-5 sm:p-6 md:max-h-[70dvh]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className={`font-mono text-xs tracking-widest ${
                      item.accentClass ?? "text-cyan-400"
                    }`}
                  >
                    {item.id}
                  </span>

                  {item.status && (
                    <span className="border border-cyan-500/25 bg-cyan-950/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                      {item.status}
                    </span>
                  )}
                </div>

                <h2
                  id={titleId}
                  className="font-sans text-xl font-bold tracking-wide text-white sm:text-2xl"
                >
                  {item.name}
                </h2>

                {item.classification && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500/55">
                    {item.classification}
                  </p>
                )}

                <p className="mt-4 font-mono text-sm leading-relaxed text-cyan-100/80">
                  {item.description}
                </p>

                {item.metrics && (
                  <div className="mt-5 border-t border-cyan-500/15 pt-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/80">
                      System Metrics
                    </p>

                    <p className="font-mono text-xs leading-relaxed text-cyan-400/70">
                      {item.metrics}
                    </p>
                  </div>
                )}

                <div className="mt-6 border-t border-cyan-500/15 pt-4">
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-md border border-cyan-500/40 px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-cyan-300 transition-colors hover:border-cyan-300 hover:bg-cyan-500/10 hover:text-white"
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