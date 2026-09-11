/**
 * Long-form transmissions (articles).
 * Live channel labels: TX-000 · LOG-000
 * Merged/sorted in data/feed.ts.
 */

import type { TransmissionArticle } from "@/lib/types";

export const transmissionArticles: TransmissionArticle[] = [
  {
    kind: "transmission",
    era: "live",
    id: "TX-001",
    date: "2026.09.11_00:00",
    title: "Genesis Activation",
    tags: ["genesis", "cryogenic", "club"],
    content: `Chamber boot complete.

Identities compressed into genesis CPC nodes.

CyborgPunks Club is online.`,
  },
];
