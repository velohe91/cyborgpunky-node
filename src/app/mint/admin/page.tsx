"use client";

import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
  CYBORGPUNK_ADMIN_WALLET,
  CYBORGPUNK_PROFILE_LABEL,
} from "@/lib/allowlist/config";
import { truncateAddress } from "@/lib/web3/multi-chain";

const isAdminWallet = (address?: string) =>
  address?.toLowerCase() === CYBORGPUNK_ADMIN_WALLET.toLowerCase();

type AllowlistEntry = {
  id: string;
  wallet_address: string;
  x_username: string;
  x_profile_url: string;
  status: string;
  registered_at: string;
};

export default function MintAdminPage() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const authorized = isConnected && isAdminWallet(address);
  const [entries, setEntries] = useState<AllowlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAllowlist = async () => {
    if (!authorized) return;

    setLoading(true);
    setError(null);

    try {
      const challengeResponse = await fetch("/api/mint/admin/challenge", {
        cache: "no-store",
      });
      const challenge = (await challengeResponse.json()) as {
        nonce?: string;
        error?: string;
      };

      if (!challengeResponse.ok || !challenge.nonce) {
        throw new Error(challenge.error ?? "Unable to start admin authentication.");
      }

      const message = [
        "CyborgPunks Club Admin Access",
        `Nonce: ${challenge.nonce}`,
      ].join("\n");

      const signature = await signMessageAsync({ message });

      const response = await fetch("/api/mint/admin/allowlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          nonce: challenge.nonce,
          signature,
        }),
      });

      const result = (await response.json()) as {
        entries?: AllowlistEntry[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to load allowlist.");
      }

      setEntries(result.entries ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load allowlist.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEntries([]);
    setError(null);
  }, [address]);

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

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadAllowlist}
                disabled={loading}
                className="hud-chip uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "AUTHENTICATING..." : "LOAD ALLOWLIST"}
              </button>
              <span className="font-mono text-xs text-slate-500">
                Admin signature required
              </span>
            </div>

            {error ? (
              <p className="mt-3 font-mono text-sm leading-6 text-[#FF2CF0]">
                {error}
              </p>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["REGISTERED", entries.length],
                [
                  "WL ELIGIBLE",
                  entries.filter((entry) => entry.status === "eligible").length,
                ],
                [
                  "PENDING",
                  entries.filter((entry) => entry.status === "pending").length,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-[#3003D9]/70 bg-black/30 p-4"
                >
                  <p className="font-mono text-sm uppercase tracking-[0.16em] text-[#0CF1FF]/70">
                    {label}
                  </p>
                  <p className="mt-2 font-sans text-2xl text-[#FF2CF0]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[#3003D9]/70 bg-black/30 p-4">
              <p className="font-sans text-[11px] uppercase tracking-wide text-[#0CF1FF]">
                Allowlist registry
              </p>

              {entries.length === 0 ? (
                <p className="mt-3 font-mono text-sm leading-6 text-slate-400">
                  Authenticate with the admin wallet to load registered
                  CyborgPunk wallets.
                </p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="border border-[#3003D9]/60 bg-black/40 p-4"
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="font-mono text-sm uppercase tracking-wide text-[#0CF1FF]">
                            Wallet
                          </p>
                          <p className="mt-1 break-all font-mono text-sm text-slate-300">
                            {entry.wallet_address}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-sm uppercase tracking-wide text-[#0CF1FF]">
                            X Profile
                          </p>
                          <a
                            href={entry.x_profile_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block font-mono text-sm text-[#0CF1FF] underline underline-offset-4 hover:text-[#FF2CF0]"
                          >
                            @{entry.x_username} ↗
                          </a>
                        </div>
                        <div>
                          <p className="font-mono text-sm uppercase tracking-wide text-[#0CF1FF]">
                            Status
                          </p>
                          <p className="mt-1 font-mono text-sm uppercase text-[#FF2CF0]">
                            {entry.status}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-sm uppercase tracking-wide text-[#0CF1FF]">
                            Registered
                          </p>
                          <p className="mt-1 font-mono text-sm text-slate-300">
                            {new Date(entry.registered_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </article>
    </main>
  );
}
