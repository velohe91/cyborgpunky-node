"use client";

import { SystemBootSequence } from "@/components/home/SystemBootSequence";
import { EnterArchiveButton } from "@/components/home/EnterArchiveButton";
import { PlayGameButton } from "@/components/home/PlayGameButton";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";

/**
 * Landing — brand plate, boot, HUD chips.
 */
export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-start overflow-visible px-4 py-4 sm:py-6">
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <motion.img
          src="/brand/cyborgpunks-club-logo.png"
          alt="CyborgPunks Club"
          className="h-auto w-full max-w-[min(92vw,560px)] bg-transparent"
          style={{
            imageRendering: "pixelated",
            mixBlendMode: "normal",
            filter:
              "drop-shadow(-2px 0 0 #FF2CF0) drop-shadow(2px 0 0 #0CF1FF)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="mt-4">
          <NeonButton href="/mint">MINTING SOON</NeonButton>
        </div>

        <SystemBootSequence />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <EnterArchiveButton />
          <PlayGameButton />
        </div>
      </div>
    </section>
  );
}
