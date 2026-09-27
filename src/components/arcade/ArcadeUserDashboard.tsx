"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { useState } from "react";
import { truncateAddress } from "@/lib/web3/multi-chain";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import { useLockedPilot } from "@/hooks/useLockedPilot";
import { getNftById } from "@/data/nfts";
import { NeonButton } from "@/components/ui/NeonButton";

export function ArcadeUserDashboard() {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);
  const { pilotId } = useLockedPilot();
  const pilot = pilotId ? getNftById(pilotId) : null;

  if (!address) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-10">
        <article className="circuit-frame w-full p-5 sm:p-6">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">Arcade // User</p>
          <h1 className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">CONNECT YOUR NODE</h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <p className="font-mono text-sm leading-6 text-slate-300">Connect your wallet to access your Arcade profile.</p>
          <div className="mt-5"><ConnectNodeButton /></div>
        </article>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-3 py-6 sm:px-4 sm:py-10">
      <article className="circuit-frame p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">Arcade // User</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">
            {truncateAddress(address, 6, 6)}
          </h1>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(address);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1400);
              } catch {
                setCopied(false);
              }
            }}
            className="hud-chip uppercase"
            aria-label="Copy wallet address"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-4">
          {pilot ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pilot.video || pilot.image} alt={pilot.title} className="h-24 w-24 object-cover" style={{ imageRendering: "pixelated", outline: "3px solid #FFC825" }} />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wide text-[#0CF1FF]/70">Selected Pilot</p>
                <p className="mt-1 font-sans text-sm uppercase text-[#0CF1FF]">{pilot.id}</p>
                <p className="mt-1 font-sans text-[9px] uppercase text-[#DB3FFD]">{pilot.title}</p>
              </div>
            </>
          ) : (
            <p className="font-mono text-sm text-slate-500">No pilot selected yet.</p>
          )}
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">High Score</p>
            <p className="mt-2 font-mono text-xl text-[#0CF1FF]">000000</p>
          </div>
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">Total Score</p>
            <p className="mt-2 font-mono text-xl text-[#0CF1FF]">000000</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <NeonButton href="/arcade">START RUN</NeonButton>
          <Link href="/arcade" className="hud-chip uppercase">SELECT PILOT</Link>
        </div>
        <div className="mt-3 flex justify-center">
          <Link href="/profile" className="hud-chip uppercase">OPEN DASHBOARD</Link>
        </div>
      </article>
    </main>
  );
}
