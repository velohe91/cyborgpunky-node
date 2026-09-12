"use client";

import { useState, useCallback } from "react";
import type { NftItem } from "@/lib/types";
import { NftCard } from "@/components/gallery/NftCard";
import { NftModal } from "@/components/gallery/NftModal";

export function NftGrid({ items }: { items: NftItem[] }) {
  const [selected, setSelected] = useState<NftItem | null>(null);

  const open = useCallback((nft: NftItem) => {
    setSelected(nft);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <>
      {/* Responsive grid: 1 → 2 (sm) → 3 (md) → 5 (lg+). Order comes from `items`. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
        {items.map((nft, i) => (
          <NftCard key={nft.id} nft={nft} index={i} onOpen={open} />
        ))}
      </div>
      <NftModal nft={selected} onClose={close} />
    </>
  );
}
