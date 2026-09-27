"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MarketCoinQuote, MarketPricesResponse } from "@/lib/types";

const POLL_MS = 45_000;
const VISIBLE = 7;

function formatUsd(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "---";
  if (value < 1) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })}`;
  }
  if (value >= 1000) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CoinIcon({ symbol }: { symbol: string }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    "aria-hidden": true,
    className: "shrink-0",
    style: { imageRendering: "pixelated" as const },
  };

  if (symbol === "BTC") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#F7931A"/><path d="M6 2h2v1h1v2H8v1h1v2H8v2H6V9H4V7h2V6H4V4h2V2Zm0 2v1h1V4H6Zm0 3v2h1V7H6Z" fill="#fff"/></svg>
  );

  if (symbol === "ETH") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#627EEA"/><path d="M7 2 4 7l3 2 3-2-3-5Zm0 6L4 7l3 5 3-5-3 1Z" fill="#fff"/></svg>
  );

  if (symbol === "USDT") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#26A17B"/><path d="M4 3h6v2H8v1h1v1H8v3H6V7H5V6h1V5H4V3Z" fill="#fff"/></svg>
  );

  if (symbol === "BNB") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#F3BA2F"/><path d="M7 2 9 4 8 5 7 4 6 5 5 4 7 2Zm-3 3 1-1 1 1-1 1-1-1Zm6 0-1-1-1 1 1 1 1-1ZM7 6l1 1-1 1-1-1 1-1Zm0 4-2-2 1-1 1 1 1-1 1 1-2 2Z" fill="#fff"/></svg>
  );

  if (symbol === "XRP") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#23292F"/><path d="M3 4h2l2 2 2-2h2L8 8 11 10H9L7 8l-2 2H3l3-2-3-4Z" fill="#fff"/></svg>
  );

  if (symbol === "USDC") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#2775CA"/><path d="M8 3H6v1H5v1H4v2h1v2h1v1h2V9H7V8H6V6h1V5h1V3Zm1 1h1v1h1v4h-1v1H9V9h1V5H9V4Z" fill="#fff"/></svg>
  );

  if (symbol === "SOL") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#9945FF"/><path d="M3 3h8L9 5H3l2-2Zm0 3h8L9 8H3l2-2Zm0 3h8l-2 2H3l2-2Z" fill="#14F195"/></svg>
  );

  if (symbol === "TRX") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#EF0027"/><path d="M3 3h7l1 1-4 7-1-1L3 3Zm2 1 1 5 3-5H5Z" fill="#fff"/></svg>
  );

  if (symbol === "ZEC") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#F4B728"/><path d="M4 3h6v2L6 9h4v2H4V9l4-4H4V3Z" fill="#151515"/></svg>
  );

  if (symbol === "FIGR_HELOC") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#5B5BEF"/><path d="M3 3h2v3h4V3h2v8H9V8H5v3H3V3Z" fill="#fff"/></svg>
  );

  if (symbol === "HYPE") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#00D4FF"/><path d="M3 3h2v3h4V3h2v8H9V8H5v3H3V3Z" fill="#111"/></svg>
  );

  if (symbol === "DOGE") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#C2A633"/><path d="M4 3h3c2 0 3 1 3 4s-1 4-3 4H4V7H3V6h1V3Zm2 2v4h1c1 0 1-1 1-2s0-2-1-2H6Z" fill="#fff"/></svg>
  );

  if (symbol === "LINK") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#375BD2"/><path d="M5 4h2v2H5v2h2v2H5L3 8V6l2-2Zm4 0 2 2v2l-2 2H7V8h2V6H7V4h2Z" fill="#fff"/></svg>
  );

  if (symbol === "XMR") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#FF6600"/><path d="M3 10V4h2l2 2 2-2h2v6H9V7L7 9 5 7v3H3Z" fill="#fff"/></svg>
  );

  if (symbol === "WBTC") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#F09242"/><path d="M5 3h2v1h2v2H8v1h1v2H7v1H5V9H4V7h1V6H4V4h1V3Zm1 2v1h1V5H6Zm0 3v1h1V8H6Z" fill="#fff"/></svg>
  );

  if (symbol === "USDS") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#7B61FF"/><path d="M4 3h6v2H6v1h3v2H6v1h4v2H4V9h3V8H4V6h3V5H4V3Z" fill="#fff"/></svg>
  );

  if (symbol === "ADA") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#0033AD"/><path d="M7 3h1v1H7V3Zm-3 2h1v1H4V5Zm6 0h1v1h-1V5ZM7 6h2v2H7V6Zm-3 3h1v1H4V9Zm6 0h1v1h-1V9ZM6 10h2v1H6v-1Z" fill="#fff"/></svg>
  );

  if (symbol === "BRAIN") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#FF4FA3"/><path d="M4 4h2v1h1V4h2v2h1v2h-1v2H7v1H5V9H4V7H3V5h1V4Zm2 2H5v2h1v1h1V8H6V6Z" fill="#fff"/></svg>
  );

  if (symbol === "LEO") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#F5A623"/><path d="M4 3h2v6h4v2H4V3Z" fill="#fff"/></svg>
  );

  if (symbol === "DLM") return (
    <svg {...common} shapeRendering="crispEdges"><circle cx="7" cy="7" r="6" fill="#20C997"/><path d="M4 3h3c2 0 3 2 3 4s-1 4-3 4H4V3Zm2 2v4h1c1 0 1-1 1-2s0-2-1-2H6Z" fill="#fff"/></svg>
  );

  return (
    <svg {...common} shapeRendering="crispEdges">
      <rect x="1" y="1" width="12" height="12" fill="currentColor"/>
      <rect x="4" y="4" width="6" height="6" fill="#05010d"/>
    </svg>
  );
}

function chipTone(symbol: string, offline: boolean): string {
  if (offline) return "text-muted";
  if (symbol === "BTC") return "text-neon-gold";
  if (symbol === "ETH") return "text-slate-100";
  return "text-neon-cyan";
}

function CoinChip({
  coin,
  status,
  className = "",
}: {
  coin: MarketCoinQuote;
  status: "loading" | "ok" | "error";
  className?: string;
}) {
  const price =
    status === "loading" && coin.usd == null ? "…" : formatUsd(coin.usd);
  const offline = status === "error" || coin.usd == null;
  return (
    <span
      className={`ticker-chip shrink-0 ${className} ${chipTone(coin.symbol, offline)}`}
      title={coin.name}
    >
      <CoinIcon symbol={coin.symbol} /> {coin.symbol} {"//"} {price}
    </span>
  );
}

/**
 * One compact ticker row: first 7 coins by API order, rest behind MORE.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPricesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [moreOpen, setMoreOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/market/prices", { cache: "no-store" });
        if (!res.ok) throw new Error(`http_${res.status}`);
        const json = (await res.json()) as MarketPricesResponse;
        if (!cancelled) {
          const coins = [...(json.coins ?? [])].sort(
            (a, b) => a.marketCapRank - b.marketCapRank,
          );
          setData({ ...json, coins });
          setStatus(coins.length ? "ok" : "error");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (moreRef.current?.contains(e.target as Node)) return;
      setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [moreOpen]);

  const coins = data?.coins ?? [];
  const visible = useMemo(() => coins.slice(0, VISIBLE), [coins]);
  const hiddenDesktop = useMemo(() => coins.slice(VISIBLE), [coins]);
  const hiddenMobile = useMemo(() => coins.slice(2), [coins]);

  const fallback: MarketCoinQuote[] = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", usd: null, marketCapRank: 1 },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", usd: null, marketCapRank: 2 },
  ];

  const desktopShown = visible.length ? visible : fallback;
  const mobileShown = desktopShown.slice(0, 2);

  const title = data
    ? `Updated ${data.updatedAt} · top ${coins.length} by USD market cap`
    : status === "error"
      ? "Price feed offline"
      : "Loading market feed";

  return (
    <div
      className="relative z-40 w-full min-w-0 overflow-visible"
      title={title}
      aria-live="polite"
    >
      <div className="ticker-row flex w-full min-w-0 flex-nowrap items-center justify-center gap-1 overflow-visible">
        {isMobile ? (
          <>
            {mobileShown.map((coin) => (
              <CoinChip key={`mobile-${coin.id}`} coin={coin} status={status} />
            ))}
          </>
        ) : (
          visible.map((coin) => (
            <CoinChip key={coin.id} coin={coin} status={status} />
          ))
        )}

        <div className="relative z-40 shrink-0" ref={moreRef}>
          <button
            type="button"
            className="ticker-chip !px-2 !py-0.5"
            aria-expanded={moreOpen}
            aria-haspopup="listbox"
            onClick={(e) => {
              e.stopPropagation();
              setMoreOpen((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMoreOpen((v) => !v);
              }
            }}
          >
            MORE
          </button>
          {moreOpen && (
            <div
              role="listbox"
              className="circuit-frame panel ticker-dropdown z-40 bg-black p-2"
            >
              <ul className="flex flex-col gap-1">
                {hiddenMobile.length > 0 && (
                  <li className="md:hidden">
                    <ul className="flex flex-col gap-1">
                      {hiddenMobile.map((coin) => (
                        <li key={`mobile-${coin.id}`}>
                          <CoinChip coin={coin} status={status} />
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {hiddenDesktop.length > 0 && (
                  <li className="hidden md:block">
                    <ul className="flex flex-col gap-1">
                      {hiddenDesktop.map((coin) => (
                        <li key={`desktop-${coin.id}`}>
                          <CoinChip coin={coin} status={status} />
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {hiddenMobile.length === 0 && hiddenDesktop.length === 0 && (
                  <li className="px-2 py-1 font-mono text-muted">
                    {"// no extra quotes"}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .ticker-dropdown {
          position: absolute !important;
          top: calc(100% + 4px) !important;
          left: 50% !important;
          width: min(18rem, calc(100vw - 1.5rem)) !important;
          max-height: 60vh !important;
          height: auto !important;
          min-height: 0 !important;
          transform: translateX(-50%) !important;
          overflow-y: auto !important;
        }
      `}</style>
    </div>
  );
}
