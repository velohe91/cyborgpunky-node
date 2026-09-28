import type { TransmissionArticle } from "@/lib/types";

export const transmissions: TransmissionArticle[] = [
  {
    kind: "transmission",
    id: "TX-004",
    date: "2026.09.27",
    title: "Cryogenic Room Network Expanded",
    tags: ["cryogenic-room", "ethereum", "minting"],
    content:
      "The live Ethereum identity vault is now connected to market access, live mints on other chains, the generation lab, and WL registration.",
  },
  {
    kind: "transmission",
    id: "TX-003",
    date: "2026.09.27",
    title: "Market Signal Online",
    tags: ["market", "signals"],
    content:
      "Live crypto market signals are now integrated into the CyborgPunks Club interface.",
  },
  {
    kind: "transmission",
    id: "TX-002",
    date: "2026.09.27",
    title: "Cryogenic Room Activated",
    tags: ["cryogenic-room", "ethereum"],
    content:
      "The Cryogenic Room is now connected to live CyborgPunks on Ethereum. Newly minted identities appear automatically.",
  },
  {
    kind: "transmission",
    id: "TX-001",
    date: "2026.09.11",
    title: "Genesis Activation",
    tags: ["genesis", "club"],
    content:
      "CyborgPunks Club entered operational state. Genesis identities are now part of the active network.",
  },
];
