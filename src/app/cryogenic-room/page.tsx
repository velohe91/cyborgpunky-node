import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { cyborgPunksNfts } from "@/data/nfts";

export const metadata: Metadata = {
  title: "Cryogenic Room",
  description:
    "CyborgPunks Club cryogenic vault — genesis CPC identities in stasis.",
};

/**
 * Cryogenic Room — CyborgPunks Club identity vault.
 * Reuses the existing NftGrid + NftModal catalog with VEL-CPC data only.
 */
export default function CryogenicRoomPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          eyebrow="Cryogenic Room // Identity Vault"
          title="Cryogenic Room"
          subtitle="Genesis CPC nodes in stasis — compressed CyborgPunks Club identities."
        />
        <NftGrid items={cyborgPunksNfts} />
      </div>
    </PageTransition>
  );
}
