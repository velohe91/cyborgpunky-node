"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAINS, getChainBadgeLabel } from "@/lib/web3/config";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EVM_ROWS: { chainId: number; label: string }[] = SUPPORTED_CHAINS.map(
  (chain) => ({
    chainId: chain.id,
    label: getChainBadgeLabel(chain.id, chain.name),
  }),
);

/**
 * EVM network switcher for CyborgPunks Club (OpenSea set).
 * Portaled to document.body.
 */
export function NetworkSwitchModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const { chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

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

  if (!mounted || !open) return null;

  const handleEvm = (chainId: number) => {
    if (chain?.id === chainId) {
      onClose();
      return;
    }
    switchChain(
      { chainId },
      {
        onSuccess: () => onClose(),
      },
    );
  };

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
        aria-labelledby="network-switch-title"
        className="circuit-frame relative z-10 my-auto w-full max-w-md max-h-[min(88dvh,640px)] overflow-y-auto p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80">
          Node // Network
        </p>
        <h2
          id="network-switch-title"
          className="mt-2 font-sans text-[11px] tracking-wide text-[#0CF1FF]"
        >
          Switch Network
        </h2>

        <ul className="mt-4 space-y-1">
          {EVM_ROWS.map((row) => {
            const active = chain?.id === row.chainId;
            return (
              <li key={row.chainId}>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleEvm(row.chainId)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left font-sans text-[10px] uppercase tracking-wide disabled:opacity-60 ${
                    active
                      ? "bg-[#0CF1FF]/15 text-[#0CF1FF]"
                      : "text-muted hover:text-[#FF2CF0]"
                  }`}
                >
                  <span>{row.label}</span>
                  {active && <span className="text-[8px]">Active</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="hud-chip hud-chip-outline mt-5 w-full uppercase"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
