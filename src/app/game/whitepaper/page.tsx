import type { Metadata } from "next";
import { GameWhitepaperView } from "@/components/game/GameWhitepaperView";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Game Protocol Whitepaper",
  description:
    "Full vision document for the VΣLOHE interactive game layer — Nodes, Sectors, Spirits, Web3 optional economy.",
};

/**
 * Long-form Game Protocol whitepaper (sections 01–18).
 */
export default function GameWhitepaperPage() {
  return (
    <PageTransition>
      <GameWhitepaperView />
    </PageTransition>
  );
}
