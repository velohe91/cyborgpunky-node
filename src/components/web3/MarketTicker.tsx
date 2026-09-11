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
  className: string;
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

function chipTone(
  status: "loading" | "ok" | "error",
  value: number | null,
  okClass: string,
): string {
  if (status === "error" || value == null) {
    return "border-neon-blue/20 text-muted";
  }
  return okClass;
}

/**
 * Compact market chips. Polls /api/market/prices every 45s.
 * Mobile: ETH + BTC visible, remaining tokens behind a +N overflow.
 */
export function MarketTicker() {
  const [data, setData] = useState<MarketPricesResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [open, setOpen] = useState(false);

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
        className: chipTone(
          status,
          data?.btcUsd ?? null,
          "border-neon-gold/60 bg-neon-gold/10 text-neon-gold shadow-[0_0_8px_rgba(255,200,37,0.12)]",
        ),
      },
      {
        key: "eth",
        label: "ETH",
        value: data?.ethUsd ?? null,
        source: data?.sources.eth ?? "pending",
        className: chipTone(
          status,
          data?.ethUsd ?? null,
          "border-slate-300/45 bg-slate-200/10 text-slate-100 shadow-[0_0_8px_rgba(226,232,240,0.1)]",
        ),
      },
      {
        key: "sol",
        label: "SOL",
        value: data?.solUsd ?? null,
        source: data?.sources.sol ?? "pending",
        className: chipTone(
          status,
          data?.solUsd ?? null,
          "border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_8px_rgba(12,241,255,0.12)]",
        ),
      },
      {
        key: "xtz",
        label: "XTZ",
        hint: "Tezos",
        value: data?.xtzUsd ?? data?.txzUsd ?? null,
        source: data?.sources.xtz ?? data?.sources.txz ?? "pending",
        className: chipTone(
          status,
          data?.xtzUsd ?? data?.txzUsd ?? null,
          "border-neon-blue/60 bg-neon-blue/10 text-[#9aa8ff] shadow-[0_0_8px_rgba(48,3,217,0.18)]",
        ),
      },
      {
        key: "pol",
        label: "POL",
        value: data?.polUsd ?? null,
        source: data?.sources.pol ?? "pending",
        className: chipTone(
          status,
          data?.polUsd ?? null,
          "border-neon-magenta/60 bg-neon-magenta/10 text-neon-magenta shadow-[0_0_8px_rgba(219,63,253,0.12)]",
        ),
      },
    ],
    [data, status],
  );

  const mobilePrimary = tokens.filter((t) => t.key === "eth" || t.key === "btc");
  const overflow = tokens.filter((t) => t.key !== "eth" && t.key !== "btc");

  const title = data
    ? `Updated ${data.updatedAt} · ${tokens
        .map((t) => `${t.label}${t.hint ? ` (${t.hint})` : ""}:${t.source}`)
        .join(" · ")}`
    : status === "error"
      ? "Price feed offline"
      : "Loading market feed";

  return (
    <div
      className="relative flex min-w-0 flex-wrap items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider sm:gap-2 sm:text-[13px]"
      title={title}
      aria-live="polite"
    >
      {tokens.map((token) => (
        <Chip
          key={token.key}
          token={token}
          status={status}
          className="hidden lg:inline-flex"
        />
      ))}

      {mobilePrimary.map((token) => (
        <Chip
          key={`m-${token.key}`}
          token={token}
          status={status}
          className="inline-flex lg:hidden"
        />
      ))}

      <div className="relative lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded border border-neon-cyan/30 bg-void/60 px-2.5 py-1 text-[12px] text-neon-cyan/80 sm:text-[13px]"
          aria-expanded={open}
          aria-label={`Show ${overflow.length} more prices`}
        >
          +{overflow.length}
        </button>
        {open && (
          <div className="absolute right-0 top-full z-40 mt-1 flex flex-col gap-1 rounded border border-neon-cyan/20 bg-void/95 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
            {overflow.map((token) => (
              <Chip key={`o-${token.key}`} token={token} status={status} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  token,
  status,
  className = "",
}: {
  token: TokenChip;
  status: "loading" | "ok" | "error";
  className?: string;
}) {
  const label = status === "loading" && token.value == null ? "…" : formatUsd(token.value);
  return (
    <span
      className={`rounded border px-2.5 py-1 sm:px-3 sm:py-1.5 ${token.className} ${className}`}
      title={token.hint}
    >
      <span className="hidden text-muted sm:inline">
        {token.label} {"//"}{" "}
      </span>
      <span className="sm:hidden">{token.label} </span>
      {label}
    </span>
  );
}
