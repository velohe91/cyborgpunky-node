"use client";

import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { cyborgPunksNfts } from "@/data/nfts";
import { truncateAddress } from "@/lib/web3/multi-chain";

const TASKS = [
  {
    id: "follow",
    title: "FOLLOW THE SIGNAL",
    description: "Follow @cyborgpunky on X.",
  },
  {
    id: "engagement",
    title: "ENGAGE THE TRANSMISSION",
    description: "Like and repost the pinned CyborgPunks Club post.",
  },
] as const;

export function CyborgPunkProfile() {
  const { address, isConnected } = useAccount();
  const [xUsername, setXUsername] = useState("");
  const [followed, setFollowed] = useState(false);
  const [engaged, setEngaged] = useState(false);

  const eligible = Boolean(address && xUsername.trim() && followed && engaged);
  const specimens = useMemo(() => cyborgPunksNfts.slice(0, 4), []);

  if (!isConnected || !address) {
    return (
      <article className="circuit-frame mt-8 p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
          Profile // Web3
        </p>
        <h2 className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[20px]">
          CYBORGPUNK PROFILE
        </h2>
        <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
        <p className="font-mono text-sm leading-6 text-slate-300">
          Connect your EVM wallet to initialize your CyborgPunk Profile and
          access the allowlist tasks.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#0CF1FF]/70">
          Wallet identity required // No wallet address is typed manually
        </p>
      </article>
    );
  }

  return (
    <section className="mt-8 grid gap-4">
      <article className="circuit-frame p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Profile // Web3
            </p>
            <h2 className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[20px]">
              CYBORGPUNK PROFILE
            </h2>
          </div>
          <span className="hud-chip !px-2 !py-1">
            {eligible ? "WL ELIGIBLE" : "IN PROGRESS"}
          </span>
        </div>

        <div className="mt-4 border border-[#3003D9]/70 bg-[#05010d]/70 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
            Connected wallet
          </p>
          <p className="mt-2 break-all font-mono text-sm text-foreground">
            {truncateAddress(address, 6, 6)}
          </p>
          <p className="mt-1 font-mono text-[10px] text-slate-500">
            This wallet is the identity associated with this profile.
          </p>
        </div>

        <div className="mt-4">
          <label
            htmlFor="cyborgpunk-x-username"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0CF1FF]"
          >
            X Username
          </label>
          <input
            id="cyborgpunk-x-username"
            value={xUsername}
            onChange={(event) => setXUsername(event.target.value)}
            placeholder="@yourusername"
            autoComplete="off"
            className="mt-2 w-full border border-[#3003D9]/80 bg-black/60 px-3 py-3 font-mono text-sm text-foreground outline-none placeholder:text-slate-600 focus:border-[#0CF1FF]"
          />
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 shadow-[0_0_18px_rgba(12,241,255,0.08)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Registration // Tasks
            </p>
            <h3 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              WL TASKS
            </h3>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            {eligible ? "COMPLETE" : "PENDING"}
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {TASKS.map((task) => {
            const complete =
              task.id === "follow" ? followed : engaged;

            return (
              <div
                key={task.id}
                className="border border-[#3003D9]/60 bg-black/30 p-3"
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      task.id === "follow"
                        ? setFollowed((value) => !value)
                        : setEngaged((value) => !value)
                    }
                    className="hud-chip shrink-0 !px-2 !py-1"
                    aria-pressed={complete}
                  >
                    {complete ? "✓" : "○"}
                  </button>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-wide text-[#0CF1FF]">
                      {task.title}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-5 text-slate-400">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!eligible}
          className="hud-chip mt-4 w-full uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          {eligible ? "REGISTER FOR WHITELIST" : "COMPLETE TASKS TO REGISTER"}
        </button>

        <p className="mt-3 font-mono text-[10px] leading-5 text-slate-500">
          Task verification is manual in this first version. X API verification
          can be connected later without changing the wallet identity model.
        </p>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Specimen // Preview
            </p>
            <h3 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              EXPECTED SPECIMENS
            </h3>
          </div>
          <span className="font-mono text-[9px] text-slate-500">
            SAMPLE // NOT FINAL
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {specimens.map((specimen) => (
            <div
              key={specimen.id}
              className="group border border-[#3003D9]/60 bg-black/40 p-2"
            >
              <div className="aspect-square overflow-hidden border border-[#0CF1FF]/20 bg-black">
                <img
                  src={specimen.image}
                  alt={specimen.title}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <p className="mt-2 truncate font-mono text-[9px] text-[#0CF1FF]">
                {specimen.id}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
