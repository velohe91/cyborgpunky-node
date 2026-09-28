import type { Metadata } from "next";
import { NftGrid } from "@/components/gallery/NftGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { NeonButton } from "@/components/ui/NeonButton";
import { getLiveCyborgPunks } from "@/lib/web3/cyborg-punk";
import type { NftItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cryogenic Room",
  description:
    "CyborgPunks Club cryogenic vault — genesis CPC identities in stasis.",
};

export const dynamic = "force-dynamic";

export default async function CryogenicRoomPage() {
  let items: NftItem[] = [];

  try {
    const cyborgPunks = await getLiveCyborgPunks();

    items = cyborgPunks
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
  } catch (error) {
    console.error("Cryogenic Room vault fetch failed:", error);
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="circuit-frame mb-5 p-4 sm:p-5 [&>header]:mb-0">
          <SectionHeading
            eyebrow="Cryogenic Room // Identity Vault"
            title="Cryogenic Room"
            subtitle="LIVE CyborgPunks on Ethereum — newly minted identities appear here automatically."
          />
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <NeonButton href="/cryogenic-room/lab">
            Enter Generation Lab
          </NeonButton>
          <a
            href="https://opensea.io/collection/cyborgpunksclub"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-chip inline-flex"
          >
            Open Market
          </a>
        </div>
        {items.length === 0 ? (
          <p className="mb-4 font-mono text-[14px] uppercase tracking-[0.2em] text-muted">
            VAULT SIGNAL OFFLINE
          </p>
        ) : null}
        <NftGrid items={items} />
      </div>
    </PageTransition>
  );
}
