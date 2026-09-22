"use client";

import { useAccount } from "wagmi";
import {
  CYBORGPUNK_ADMIN_WALLET,
  CYBORGPUNK_PROFILE_LABEL,
} from "@/lib/allowlist/config";
import { truncateAddress } from "@/lib/web3/multi-chain";

const isAdminWallet = (address?: string) =>
  address?.toLowerCase() === CYBORGPUNK_ADMIN_WALLET.toLowerCase();

export default function MintAdminPage() {
  const { address, isConnected } = useAccount();
  const authorized = isConnected && isAdminWallet(address);

  return (
    <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 sm:py-10">
      <article className="circuit-frame p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
          Mint // Administration
        </p>
        <h1 className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[22px]">
          {CYBORGPUNK_PROFILE_LABEL} ADMIN
        </h1>
        <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />

        {!isConnected ? (
          <p className="font-mono text-sm leading-6 text-slate-300">
            Connect the configured admin wallet to access the allowlist
            dashboard.
          </p>
        ) : !authorized ? (
          <p className="font-mono text-sm leading-6 text-slate-300">
            This wallet is not authorized for the mint administration panel.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hud-chip !px-2 !py-1">ADMIN AUTHORIZED</span>
              <span className="font-mono text-[10px] text-slate-500">
                {truncateAddress(address ?? "", 6, 6)}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["REGISTERED", "---"],
                ["WL ELIGIBLE", "---"],
                ["PENDING", "---"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-[#3003D9]/70 bg-black/30 p-4"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
                    {label}
                  </p>
                  <p className="mt-2 font-sans text-lg text-[#FF2CF0]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[#3003D9]/70 bg-black/30 p-4">
              <p className="font-sans text-[10px] uppercase tracking-wide text-[#0CF1FF]">
                Allowlist registry
              </p>
              <p className="mt-2 font-mono text-sm leading-6 text-slate-400">
                Database persistence is the next layer. This dashboard is the
                protected admin surface that will display wallet-linked
                CyborgPunk Profiles once the database adapter is connected.
              </p>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
