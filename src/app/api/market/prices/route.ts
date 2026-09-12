import { NextResponse } from "next/server";
import type { MarketCoinQuote, MarketPricesResponse } from "@/lib/types";

/** In-memory cache (~45s) to reduce upstream rate limits */
let cache: { at: number; body: MarketPricesResponse } | null = null;
const CACHE_MS = 45_000;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30",
};

type CoinGeckoMarket = {
  id?: string;
  symbol?: string;
  name?: string;
  current_price?: number | null;
  market_cap?: number | null;
  market_cap_rank?: number | null;
};

function toCoin(row: CoinGeckoMarket, index: number): MarketCoinQuote {
  const usd =
    typeof row.current_price === "number" && Number.isFinite(row.current_price)
      ? row.current_price
      : null;
  const rank =
    typeof row.market_cap_rank === "number" && row.market_cap_rank > 0
      ? row.market_cap_rank
      : index + 1;
  return {
    id: row.id ?? `coin-${index}`,
    symbol: (row.symbol ?? "").toUpperCase(),
    name: row.name ?? "",
    usd,
    marketCapRank: rank,
  };
}

async function fetchTopMarkets(): Promise<MarketCoinQuote[] | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const raw = (await res.json()) as CoinGeckoMarket[];
    if (!Array.isArray(raw)) return null;
    const coins = raw.slice(0, 20).map(toCoin);
    coins.sort((a, b) => a.marketCapRank - b.marketCapRank);
    return coins;
  } catch {
    return null;
  }
}

type SpotCache = { at: number; quotes: Record<string, number | null> };
let spotCache: SpotCache | null = null;

async function fetchSpot(ids: string[]): Promise<Record<string, number | null>> {
  const unique = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
  if (unique.length === 0) return {};
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(unique.join(","))}&vs_currencies=usd`,
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) return Object.fromEntries(unique.map((id) => [id, null]));
    const raw = (await res.json()) as Record<string, { usd?: number }>;
    return Object.fromEntries(
      unique.map((id) => [
        id,
        typeof raw[id]?.usd === "number" ? raw[id].usd : null,
      ]),
    );
  } catch {
    return Object.fromEntries(unique.map((id) => [id, null]));
  }
}

export async function GET(req: Request) {
  const now = Date.now();
  const idsParam = new URL(req.url).searchParams.get("ids");
  if (idsParam) {
    const ids = idsParam.split(",");
    if (spotCache && now - spotCache.at < CACHE_MS) {
      const quotes = Object.fromEntries(
        ids.map((id) => [id, spotCache!.quotes[id] ?? null]),
      );
      const missing = ids.filter((id) => !(id in spotCache!.quotes));
      if (missing.length === 0) {
        return NextResponse.json(
          { updatedAt: new Date(spotCache.at).toISOString(), quotes },
          { headers: CACHE_HEADERS },
        );
      }
    }
    const quotes = await fetchSpot(ids);
    spotCache = {
      at: now,
      quotes: { ...(spotCache?.quotes ?? {}), ...quotes },
    };
    return NextResponse.json(
      { updatedAt: new Date().toISOString(), quotes },
      { headers: CACHE_HEADERS },
    );
  }

  if (cache && now - cache.at < CACHE_MS) {
    return NextResponse.json(cache.body, { headers: CACHE_HEADERS });
  }

  const coins = await fetchTopMarkets();
  if (!coins) {
    if (cache) {
      return NextResponse.json(cache.body, { headers: CACHE_HEADERS });
    }
    const empty: MarketPricesResponse = {
      updatedAt: new Date().toISOString(),
      coins: [],
    };
    return NextResponse.json(empty, {
      status: 502,
      headers: CACHE_HEADERS,
    });
  }

  const body: MarketPricesResponse = {
    updatedAt: new Date().toISOString(),
    coins,
  };
  cache = { at: now, body };

  return NextResponse.json(body, { headers: CACHE_HEADERS });
}
