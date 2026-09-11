import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { GalleryBackLink } from "@/components/gallery/GalleryBackLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { velozartNfts } from "@/data/velozart-nfts";

export const metadata: Metadata = {
  title: "NFT VeLozArt Gallery",
  description:
    "VeLozArt AI artworks — Tree of Life, Biopunk Faces, Ballet Dancer, Watercolor Arts.",
};

/**
 * VeLozArt wing — same grid + modal system as the main archive.
 */
export default function VelozArtGalleryPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <GalleryBackLink />
        <SectionHeading
          eyebrow="Sector // VeLozArt"
          title="NFT VeLozArt Gallery"
          subtitle="A separate collection of AI artworks under the VeLozArt label. Select a piece to expand lore and marketplace links."
        />
        <NftGrid items={velozartNfts} />
      </div>
    </PageTransition>
  );
}
