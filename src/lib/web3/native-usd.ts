import type { MarketCoinQuote } from "@/lib/types";

/** L2s / ETH-equivalent natives priced with Ethereum USD. */
const ETH_SYMBOLS = new Set(["ETH", "WETH"]);

const GECKO_BY_SYMBOL: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  POL: "polygon-ecosystem-token",
  MATIC: "matic-network",
  AVAX: "avalanche-2",
  SEI: "sei-network",
  BERA: "berachain-bera",
  FLOW: "flow",
  APE: "apecoin",
  RON: "ronin",
  MON: "monad",
  SOL: "solana",
};

export function geckoIdForNative(symbol: string): string {
  const upper = symbol.toUpperCase();
  if (ETH_SYMBOLS.has(upper)) return "ethereum";
  return GECKO_BY_SYMBOL[upper] ?? upper.toLowerCase();
}

export function usdFromTicker(
  symbol: string,
  coins: MarketCoinQuote[],
): number | null {
  const upper = symbol.toUpperCase();
  const wanted = ETH_SYMBOLS.has(upper)
    ? "ETH"
    : upper === "MATIC"
      ? "POL"
      : upper;
  const hit =
    coins.find((c) => c.symbol === wanted) ??
    coins.find((c) => c.symbol === upper) ??
    (wanted === "POL"
      ? coins.find((c) => c.symbol === "MATIC")
      : undefined);
  return hit?.usd ?? null;
}

export function formatUsdFiat(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "---";
  const digits = value < 1 ? 4 : 2;
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}
