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

function chipTone(symbol: string, offline: boolean): string {
  if (offline) return "text-muted";
  if (symbol === "BTC") return "text-neon-gold";
  if (symbol === "ETH") return "text-slate-100";
  return "text-neon-cyan";
}

function CoinChip({
  coin,
  status,
}: {
  coin: MarketCoinQuote;
  status: "loading" | "ok" | "error";
}) {
  const price =
    status === "loading" && coin.usd == null ? "…" : formatUsd(coin.usd);
  const offline = status === "error" || coin.usd == null;
  return (
    <span
      className={`ticker-chip shrink-0 ${chipTone(coin.symbol, offline)}`}
      title={coin.name}
    >
      {coin.symbol} {"//"} {price}
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
  const hidden = useMemo(() => coins.slice(VISIBLE), [coins]);

  const fallback: MarketCoinQuote[] = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", usd: null, marketCapRank: 1 },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", usd: null, marketCapRank: 2 },
  ];
  const shown = visible.length ? visible : fallback;

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
        {shown.map((coin) => (
          <CoinChip key={coin.id} coin={coin} status={status} />
        ))}
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
              {hidden.length === 0 ? (
                <p className="px-2 py-1 font-mono text-muted">
                  {"// no extra quotes"}
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {hidden.map((coin) => (
                    <li key={coin.id}>
                      <CoinChip coin={coin} status={status} />
                    </li>
                  ))}
                </ul>
              )}
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

        @media (max-width: 767px) {
          .ticker-row > .ticker-chip:nth-of-type(n + 3) {
            display: none;
          }

          .ticker-dropdown {
            z-index: 9999 !important;
          }
        }
      `}</style>
    </div>
  );
}
