"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HAS_WALLETCONNECT_PROJECT_ID } from "@/lib/web3/config";
import { truncateAddress } from "@/lib/web3/multi-chain";

const nodeBtnClass =
  "hud-chip !px-2.5 !py-1.5";

/**
 * Header CONNECT NODE — RainbowKit connect / account modals only.
 * Disconnect lives in RainbowKit's account modal.
 */
export function ConnectNodeButton() {
  const [missingEnvOpen, setMissingEnvOpen] = useState(false);

  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;

          const onConnect = () => {
            if (!HAS_WALLETCONNECT_PROJECT_ID) {
              setMissingEnvOpen(true);
              return;
            }
            openConnectModal();
          };

          if (!ready) {
            return (
              <button
                type="button"
                disabled
                className={`${nodeBtnClass} uppercase opacity-50`}
              >
                …
              </button>
            );
          }

          if (!account || !chain) {
            return (
              <button
                type="button"
                onClick={onConnect}
                className={`${nodeBtnClass} uppercase`}
              >
                Connect Node
              </button>
            );
          }

          if (chain.unsupported) {
            return (
              <button
                type="button"
                onClick={openChainModal}
                className={`${nodeBtnClass} uppercase`}
              >
                Switch Network
              </button>
            );
          }

          return (
            <button
              type="button"
              onClick={openAccountModal}
              className={nodeBtnClass}
              title={account.address}
            >
              {truncateAddress(account.address, 4, 4)}
            </button>
          );
        }}
      </ConnectButton.Custom>

      {missingEnvOpen && (
        <MissingProjectIdModal onClose={() => setMissingEnvOpen(false)} />
      )}
    </>
  );
}

function MissingProjectIdModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

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
        aria-labelledby="missing-wc-title"
        className="circuit-frame relative z-10 my-auto w-full max-w-md p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80">
          Node // Env
        </p>
        <h2
          id="missing-wc-title"
          className="mt-2 font-sans text-[11px] leading-relaxed tracking-wide text-[#0CF1FF] sm:text-xs"
        >
          WalletConnect Project ID missing
        </h2>
        <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
          CONNECT NODE needs{" "}
          <code className="text-[#0CF1FF]">
            NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
          </code>
          .
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 font-mono text-sm leading-relaxed text-muted">
          <li>
            Copy <code className="text-[#0CF1FF]">.env.local.example</code> to{" "}
            <code className="text-[#0CF1FF]">.env.local</code>
          </li>
          <li>
            Create a Project ID at{" "}
            <a
              href="https://cloud.walletconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0CF1FF] underline decoration-[#0CF1FF]/40 underline-offset-2 hover:text-[#DB3FFD]"
            >
              cloud.walletconnect.com
            </a>
          </li>
          <li>Paste it into the env file and restart the dev server.</li>
        </ol>
        <button
          type="button"
          onClick={onClose}
          className={`${nodeBtnClass} mt-5 w-full uppercase`}
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
