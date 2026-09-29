/**
 * Shared domain types for VΣLOHE SYSTEM.
 * Keep NFT and feed shapes here so data files stay type-safe.
 */

export type NftRarity =
  | "common"
  | "rare"
  | "super-rare"
  | "epic"
  | "legendary"
  | "mythic";

/** System phase / operational status shown on cards and modal */
export type NftStatus =
  | "Activated"
  | "Dormant"
  | "Initialization"
  | "Non-Linear Access"
  | "Operational"
  | "Supervisory Stability"
  | "Signal Suspension"
  | "Archived"
  | "Restricted"
  | "Unresolved"
  | "Compressed"
  | "Genesis";

export interface NftItem {
  /** Unique catalog ID, e.g. "VEL-001" */
  id: string;
  /** Marketplace ownership / sale state */
  saleStatus?: "available" | "sold";
  title: string;
  /** Static cover / poster under /public */
  image: string;
  /** Optional loop or cinematic under /public */
  video?: string;
  /** Short blurb for cards / previews */
  description: string;
  /** Longer multi-line lore shown in the detail modal */
  lore: string;
  /** Optional collection / series name */
  series?: string;
  /** Stored lowercase: common | rare | super-rare | epic | legendary | mythic */
  rarity: NftRarity;
  /** Optional OpenSea listing URL */
  marketplace?: string;
  /** Optional Objkt (Tezos) listing URL */
  objkt?: string;
  status?: NftStatus;
  tags?: string[];
  year?: number;

/** CyborgPunks identity trait */
cyborgId?: string;
/** CyborgPunks faction trait */
faction?: string;
/** CyborgPunks gender trait */
gender?: string;
/** CyborgPunks hair trait */
hair?: string;
/** CyborgPunks accessory trait */
accessory?: string;
/** CyborgPunks combat ability trait */
ability?: string;
}

/** A short public communication from CyborgPunks Club. */
export interface TransmissionArticle {
  kind: "transmission";
  id: string;
  date: string;
  title: string;
  /** Brief community-facing update. Keep transmissions concise. */
  content: string;
  tags?: string[];
}

export type MarketCoinQuote = {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  usd: number | null;
  marketCapRank: number;
};

export type MarketPricesResponse = {
  updatedAt: string;
  coins: MarketCoinQuote[];
};
