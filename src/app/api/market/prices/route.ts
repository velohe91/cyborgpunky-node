import { NextResponse } from "next/server";
import type { MarketCoinQuote, MarketPricesResponse } from "@/lib/types";

/** In-memory cache (~45s) to reduce upstream rate limits */
let cache: { at: number; body: MarketPricesResponse } | null = null;
const CACHE_MS = 45_000;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=45, stale-while-revalidate=30",
};

type CoinMarketCapListing = {
  id?: number;
  symbol?: string;
  name?: string;
  cmc_rank?: number | null;
  quote?: Array<{
    id?: number;
    symbol?: string;
    price?: number | null;
  }>;
};

function toCoin(row: CoinMarketCapListing, index: number): MarketCoinQuote {
  const usdQuote =
    row.quote?.find((quote) => quote.symbol === "USD") ?? row.quote?.[0];
  const usd =
    typeof usdQuote?.price === "number" && Number.isFinite(usdQuote.price)
      ? usdQuote.price
      : null;
  const rank =
    typeof row.cmc_rank === "number" && row.cmc_rank > 0
      ? row.cmc_rank
      : index + 1;
  const id = typeof row.id === "number" ? String(row.id) : `coin-${index}`;

  return {
    id,
    symbol: (row.symbol ?? "").toUpperCase(),
    name: row.name ?? "",
    image:
      typeof row.id === "number"
        ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`
        : undefined,
    usd,
    marketCapRank: rank,
  };
}

async function fetchTopMarkets(): Promise<MarketCoinQuote[] | null> {
  try {
    const res = await fetch(
      "https://pro-api.coinmarketcap.com/public-api/v3/cryptocurrency/listings/latest?start=1&limit=20&convert=USD",
      { next: { revalidate: 45 }, headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;

    const payload = (await res.json()) as {
      data?: CoinMarketCapListing[];
    };
    if (!Array.isArray(payload.data)) return null;

    const coins = payload.data.slice(0, 20).map(toCoin);
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
