import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLiveCyborgPunks } from "@/lib/web3/cyborg-punk";
import type { NftItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cryogenic Room",
  description:
    "CyborgPunks Club cryogenic vault — genesis CPC identities in stasis.",
};

export const dynamic = "force-dynamic";

export default async function CryogenicRoomPage() {
  const cyborgPunks = await getLiveCyborgPunks();

  const items: NftItem[] = cyborgPunks
    .map((nft) => ({
      id: nft.tokenId,
      title: nft.name ?? `CyborgPunk ${nft.tokenId}`,
      image: nft.imageUrl ?? "",
      description:
        nft.description ??
        "CyborgPunks Club identity preserved within the Cryogenic Room.",
      lore: "",
      rarity: nft.rarity ?? "common",
      status: "Genesis" as const,
      tags: ["CyborgPunks Club"],
      year: 2026,
     cyborgId: nft.cyborgId,
faction: nft.faction,
gender: nft.gender,
hair: nft.hair,
accessory: nft.accessory,
ability: nft.ability,
    }))
    .sort((a, b) => {
      const aNumber = Number(
        a.title.match(/(\d+)$/)?.[1] ?? Number.MAX_SAFE_INTEGER,
      );
      const bNumber = Number(
        b.title.match(/(\d+)$/)?.[1] ?? Number.MAX_SAFE_INTEGER,
      );

      return aNumber - bNumber;
    });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <SectionHeading
          eyebrow="Cryogenic Room // Identity Vault"
          title="Cryogenic Room"
          subtitle="Genesis CPC nodes in stasis — compressed CyborgPunks Club identities."
        />
        <NftGrid items={items} />
      </div>
    </PageTransition>
  );
}
