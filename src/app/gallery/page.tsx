import type { Metadata } from "next";
import { GallerySelectScreen } from "@/components/gallery/GallerySelectScreen";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Choose a gallery sector — VΣLOHE SYSTEM Archive or Exhibition Node.",
};

/**
 * Gallery hub — sector selection (not the NFT grid).
 */
export default function GalleryPage() {
  return (
    <PageTransition>
      <GallerySelectScreen />
    </PageTransition>
  );
}
