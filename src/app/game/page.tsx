import type { Metadata } from "next";
import { GameProtocolView } from "@/components/game/GameProtocolView";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "VΣLOHE SYSTEM — GAME WHITEPAPER",
  description:
    "Build your Nexus. Expand the Network. Reach the Aethergrid — VΣLOHE SYSTEM game layer in active development.",
};

/**
 * Short game hub — whitepaper lives at /game/whitepaper
 */
export default function GamePage() {
  return (
    <PageTransition>
      <GameProtocolView />
    </PageTransition>
  );
}
