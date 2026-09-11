import type { Metadata } from "next";
import { LoreVaultView } from "@/components/lore/LoreVaultView";

export const metadata: Metadata = {
  title: "Lore & Archives",
  description:
    "Deep vault: CyborgPunks, Lunarya, and The Aethergrid Spirits — sealed VΣLOHE field lore.",
};

export default function LorePage() {
  return <LoreVaultView />;
}
