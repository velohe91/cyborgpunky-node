"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import {
  formatNativeBalance,
  getEvmExplorerUrl,
  truncateAddress,
} from "@/lib/web3/multi-chain";
import { getChainBadgeLabel } from "@/lib/web3/config";
import {
  formatUsdFiat,
  geckoIdForNative,
  usdFromTicker,
} from "@/lib/web3/native-usd";
import type { MarketPricesResponse } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSwitchNetwork: () => void;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* ignore */
  }
}

/**
 * CyborgPunks Club account panel — replaces RainbowKit openAccountModal.
 * EVM only. Portaled to document.body.
 */
export function NodeAccountModal({ open, onClose, onSwitchNetwork }: Props) {
  const [mounted, setMounted] = useState(false);
  const { address, chain, isConnected } = useAccount();
  const { data: evmBalance } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);
  const [usd, setUsd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const symbol = evmBalance?.symbol ?? chain?.nativeCurrency.symbol ?? "ETH";
    const amount = evmBalance ? Number(evmBalance.formatted) : null;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/market/prices", { cache: "no-store" });
        const json = (await res.json()) as MarketPricesResponse;
        let price = usdFromTicker(symbol, json.coins ?? []);
        if (price == null) {
          const geckoId = geckoIdForNative(symbol);
          const spot = await fetch(
            `/api/market/prices?ids=${encodeURIComponent(geckoId)}`,
            { cache: "no-store" },
          );
          const spotJson = (await spot.json()) as {
            quotes?: Record<string, number | null>;
          };
          price = spotJson.quotes?.[geckoId] ?? null;
        }
        if (!cancelled) {
          setUsd(
            price != null && amount != null && Number.isFinite(amount)
              ? price * amount
              : null,
          );
        }
      } catch {
        if (!cancelled) setUsd(null);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [open, evmBalance, chain?.nativeCurrency.symbol]);

  if (!mounted || !open) return null;

  const symbol = evmBalance?.symbol ?? chain?.nativeCurrency.symbol ?? "ETH";
  const cryptoLabel = evmBalance
    ? formatNativeBalance(Number(evmBalance.formatted), symbol)
    : `--- ${symbol}`;
  const explorer =
    chain?.blockExplorers?.default.url && address
      ? `${chain.blockExplorers.default.url}/address/${address}`
      : address
        ? getEvmExplorerUrl(chain?.id ?? 1, address)
        : "#";

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/90"
        aria-label="Close"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-account-title"
        className="circuit-frame relative z-10 my-auto w-full max-w-md p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80">
          Node // Link
        </p>
        <h2
          id="node-account-title"
          className="mt-2 font-sans text-[11px] tracking-wide text-[#0CF1FF]"
        >
          CyborgPunks Club
        </h2>

        {isConnected && address ? (
          <article className="panel mt-4 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="hud-chip !px-2 !py-1">
                {chain
                  ? getChainBadgeLabel(chain.id, chain.name)
                  : "UNKNOWN"}
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] text-foreground">
              {truncateAddress(address, 4, 4)}
            </p>
            <p className="mt-2 font-mono text-[11px] text-[#0CF1FF]">
              {cryptoLabel}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#DB3FFD]">
              {formatUsdFiat(usd)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="hud-chip !px-2 !py-1"
                onClick={async () => {
                  await copyText(address);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1200);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-chip hud-chip-outline !px-2 !py-1"
              >
                Explorer
              </a>
            </div>
          </article>
        ) : (
          <p className="mt-4 font-mono text-[11px] text-muted">
            No EVM node linked.
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchNetwork();
            }}
            className="hud-chip w-full uppercase"
          >
            Switch Network
          </button>
          {isConnected && (
            <button
              type="button"
              onClick={() => {
                disconnect();
                onClose();
              }}
              className="hud-chip hud-chip-outline w-full uppercase"
            >
              Disconnect Node
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="hud-chip hud-chip-outline w-full uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
