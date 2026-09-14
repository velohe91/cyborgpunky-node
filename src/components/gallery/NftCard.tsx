"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { NftItem } from "@/lib/types";
import { RARITY_COLORS } from "@/lib/constants";

type Props = {
  nft: NftItem;
  index: number;
  onOpen: (nft: NftItem) => void;
};

export function NftCard({ nft, index, onOpen }: Props) {
  const rarityClass = RARITY_COLORS[nft.rarity] ?? RARITY_COLORS.common;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(nft)}
      className="circuit-frame group relative z-0 flex w-full max-w-full flex-col overflow-hidden bg-[#05010a] text-left"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.4), duration: 0.35 }}
    >
      <div className="relative aspect-square overflow-hidden bg-black cyber-grid">
        <Image
          src={nft.image}
          alt={nft.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover pixelated"
        />

        {nft.saleStatus === "sold" && (
          <span className="absolute left-2 top-2 z-10 border-2 border-[#FFC825] bg-black px-1.5 py-0.5 font-sans text-[8px] uppercase tracking-wider text-[#FFC825]">
            Sold
          </span>
        )}

        <span
          className={`absolute right-3 top-3 z-10 border-2 bg-black px-1.5 py-0.5 font-sans text-[10px] uppercase tracking-wider ${rarityClass}`}
        >
          {nft.rarity}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <h3 className="max-w-full font-sans text-[12px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap]">
          {nft.title}
        </h3>

        <div className="mt-1 flex flex-col gap-2.5 font-mono text-[12px] uppercase tracking-widest">
          {nft.cyborgId && (
            <div>
              <span className="block text-[12px] text-neon-cyan/70">
                Cyborg ID
              </span>
              <span className="block text-[14px] text-neon-cyan">
                {nft.cyborgId}
              </span>
            </div>
          )}

          {nft.accessory && (
            <div>
              <span className="block text-[12px] text-neon-cyan/70">
                Accessory
              </span>
              <span className="block text-[14px] text-[#FF2CF0]">
                {nft.accessory}
              </span>
            </div>
          )}

          {nft.ability && (
            <div>
              <span className="block text-[12px] text-neon-cyan/70">
                Ability
              </span>
              <span className="block text-[14px] text-[#FFC825]">
                {nft.ability}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
