"use client";

import { useRef, useState } from "react";
import ArchiveModal, {
  type ArchiveModalData,
} from "@/components/game/ArchiveModal";

const cipherPunks = [
  {
    id: "VEL-CPC001",
    name: "CYBORG PUNK 001",
    image: "/nfts/videos/VEL-CPC001.gif",
    rarity: "COMMON",
    description:
      "Derived identity node. Synchronized via encrypted channels.",
  },
  {
    id: "VEL-CPC002",
    name: "CYBORG PUNK 002",
    image: "/nfts/videos/VEL-CPC002.gif",
    rarity: "COMMON",
    description:
      "Derived identity node. Synchronized via encrypted channels.",
  },
  {
    id: "VEL-CPC003",
    name: "CYBORG PUNK 003",
    image: "/nfts/videos/VEL-CPC003.gif",
    rarity: "COMMON",
    description:
      "Derived identity node. Synchronized via encrypted channels.",
  },
  {
    id: "VEL-CPC004",
    name: "CYBORG PUNK 004",
    image: "/nfts/videos/VEL-CPC004.gif",
    rarity: "COMMON",
    description:
      "Derived identity node. Synchronized via encrypted channels.",
  },
];

type CyborgPunk = (typeof cipherPunks)[number];

export default function EncryptedFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPunk, setSelectedPunk] =
    useState<CyborgPunk | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (openState: boolean) => {
    setIsOpen(openState);

    if (!openState && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const openPunk = (punk: CyborgPunk) => {
    setSelectedPunk(punk);
  };

  const closePunk = () => {
    setSelectedPunk(null);
  };

  const modalData: ArchiveModalData | null = selectedPunk
    ? {
        id: selectedPunk.id,
        name: selectedPunk.name,
        description: selectedPunk.description,
        image: selectedPunk.image,
        classification: "CYBORGPUNKS CLUB // RESTRICTED ASSET",
        status: selectedPunk.rarity,
      }
    : null;

  return (
    <>
      <div
        ref={containerRef}
        className="relative my-8 overflow-hidden border border-cyan-900/60 bg-[#060911]/80 p-4 shadow-[0_0_15px_rgba(0,255,255,0.05)] sm:p-5"
      >
        {/* Archive scanlines */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />

        {/* Header */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-4 border-b border-cyan-900/50 pb-2">
          <h4 className="font-mono text-[10px] tracking-[0.2em] text-cyan-400 sm:text-xs">
            [ SECURE FOLDER // CYBORGPUNKS_CLUB ]
          </h4>

          <button
            type="button"
            onClick={() => handleToggle(!isOpen)}
            className="shrink-0 font-mono text-[9px] tracking-wider text-cyan-500/80 transition hover:text-cyan-300 sm:text-[10px]"
          >
            STATUS:{" "}
            {isOpen
              ? "[ DECRYPTED // LOCK ]"
              : "[ LOCKED ]"}
          </button>
        </div>

        {!isOpen ? (
          /* Locked state */
          <div className="relative z-10 py-4 text-center">
            <button
              type="button"
              onClick={() => handleToggle(true)}
              className="border border-cyan-500/60 bg-cyan-950/30 px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] sm:px-6 sm:py-3 sm:text-xs"
            >
              OPEN ENCRYPTED FOLDER →
            </button>
          </div>
        ) : (
          /* Decrypted directory */
          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-between border-b border-cyan-900/30 pb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500/40">
                DIRECTORY // RECOVERED ASSETS
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-500/40">
                {cipherPunks.length.toString().padStart(2, "0")} FILES
              </span>
            </div>

            <div className="space-y-2">
              {cipherPunks.map((punk) => (
                <button
                  key={punk.id}
                  type="button"
                  onClick={() => openPunk(punk)}
                  className="group flex w-full items-center gap-3 border border-cyan-900/50 bg-[#03050a]/80 px-3 py-3 text-left transition-all duration-300 hover:border-cyan-500/60 hover:bg-cyan-500/[0.04] hover:shadow-[0_0_18px_rgba(0,255,255,0.06)] sm:px-4"
                >
                  {/* File indicator */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-cyan-900/60 bg-cyan-950/20">
                    <span className="font-mono text-[9px] text-cyan-500/60 group-hover:text-cyan-300">
                      ▣
                    </span>
                  </div>

                  {/* File information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <span className="font-mono text-[10px] tracking-[0.14em] text-cyan-500/60">
                        {punk.id}
                      </span>

                      <span className="font-sans text-xs font-semibold tracking-wide text-cyan-100/90">
                        {punk.name}
                      </span>
                    </div>

                    <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-500/35">
                      DERIVED IDENTITY NODE
                    </p>
                  </div>

                  {/* Classification */}
                  <span className="hidden shrink-0 border border-cyan-800/60 bg-cyan-950/60 px-2 py-0.5 font-mono text-[9px] text-cyan-400 sm:inline-flex">
                    {punk.rarity}
                  </span>

                  {/* Action */}
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-500/40 transition group-hover:text-cyan-300">
                    INSPECT →
                  </span>
                </button>
              ))}
            </div>

            {/* Lock */}
            <div className="mt-4 border-t border-cyan-900/40 pt-3 text-center">
              <button
                type="button"
                onClick={() => handleToggle(false)}
                className="border border-red-500/40 bg-red-950/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-red-300/80 transition-all duration-300 hover:border-red-400/60 hover:bg-red-500/10 hover:text-white"
              >
                ← LOCK FOLDER
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shared archive modal */}
      <ArchiveModal item={modalData} onClose={closePunk} />
    </>
  );
}