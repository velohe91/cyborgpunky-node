import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { GalleryBackLink } from "@/components/gallery/GalleryBackLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { communityAcquisitions } from "@/data/community-acquisitions";

export const metadata: Metadata = {
  title: "NFT Exhibition Node",
  description:
    "Community artworks acquired by VΣLOHE SYSTEM and preserved in the exhibition node.",
};

/**
 * Community acquisition wing — a growing record of NFTs collected from the VΣLOHE community.
 */
export default function ExhibitionNodePage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <GalleryBackLink />
        <SectionHeading
          eyebrow="Node // Community Acquisitions"
          title="NFT Exhibition Node"
          subtitle="A living exhibition of artworks acquired from the VΣLOHE community — collected, verified, and preserved within the system."
        />
        <NftGrid items={communityAcquisitions} />
      </div>
    </PageTransition>
  );
}
