"use client";

import { useEffect, useMemo, useState } from "react";
import type { MarketPricesResponse } from "@/lib/types";

const POLL_MS = 45_000;

type TokenKey = "btc" | "eth" | "sol" | "xtz" | "pol";

type TokenChip = {
  key: TokenKey;
  label: string;
  value: number | null;
  source: string;
  tone: string;
  hint?: string;
};

function formatUsd(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "---";
  const digits = value < 1 ? 4 : 2;
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

/**
 * One row, five chips: BTC ETH SOL XTZ POL.
 * Polls /api/market/prices every 45s.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPricesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/market/prices", { cache: "no-store" });
        if (!res.ok) throw new Error(`http_${res.status}`);
        const json = (await res.json()) as MarketPricesResponse;
        if (!cancelled) {
          setData(json);
          setStatus("ok");
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

  const tokens: TokenChip[] = useMemo(
    () => [
      {
        key: "btc",
        label: "BTC",
        value: data?.btcUsd ?? null,
        source: data?.sources.btc ?? "pending",
        tone: "text-neon-gold",
      },
      {
        key: "eth",
        label: "ETH",
        value: data?.ethUsd ?? null,
        source: data?.sources.eth ?? "pending",
        tone: "text-slate-100",
      },
      {
        key: "sol",
        label: "SOL",
        value: data?.solUsd ?? null,
        source: data?.sources.sol ?? "pending",
        tone: "text-neon-cyan",
      },
      {
        key: "xtz",
        label: "XTZ",
        hint: "Tezos",
        value: data?.xtzUsd ?? data?.txzUsd ?? null,
        source: data?.sources.xtz ?? data?.sources.txz ?? "pending",
        tone: "text-[#9aa8ff]",
      },
      {
        key: "pol",
        label: "POL",
        value: data?.polUsd ?? null,
        source: data?.sources.pol ?? "pending",
        tone: "text-neon-magenta",
      },
    ],
    [data],
  );

  const title = data
    ? `Updated ${data.updatedAt} · ${tokens
        .map((t) => `${t.label}${t.hint ? ` (${t.hint})` : ""}:${t.source}`)
        .join(" · ")}`
    : status === "error"
      ? "Price feed offline"
      : "Loading market feed";

  return (
    <div
      className="flex w-full max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-x-auto font-sans text-[10px] uppercase tracking-wider sm:gap-2 sm:text-[11px]"
      title={title}
      aria-live="polite"
    >
      {tokens.map((token) => {
        const label =
          status === "loading" && token.value == null
            ? "…"
            : formatUsd(token.value);
        const offline = status === "error" || token.value == null;
        return (
          <span
            key={token.key}
            className={`ticker-chip ${offline ? "text-muted" : token.tone}`}
            title={token.hint}
          >
            {token.label} {"//"} {label}
          </span>
        );
      })}
    </div>
  );
}
