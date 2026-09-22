"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import {
  loadCyborgPunkProfile,
  saveCyborgPunkProfile,
  type CyborgPunkLocalProfile,
} from "@/lib/allowlist/profile-storage";
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

export function CyborgPunkUserDashboard() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<CyborgPunkLocalProfile | null>(null);

  useEffect(() => {
    if (!address) {
      setProfile(null);
      return;
    }

    setProfile(loadCyborgPunkProfile(address));
  }, [address]);

  if (!address) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unauthorized-sector-title"
      >
        <div className="circuit-frame w-full max-w-lg p-5 sm:p-6">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Sector // Access
          </p>
          <h1
            id="unauthorized-sector-title"
            className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]"
          >
            UNAUTHORIZED SECTOR
          </h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <p className="font-mono text-sm leading-6 text-slate-300 sm:text-base">
            WALLET IDENTITY REQUIRED
          </p>
          <p className="mt-2 font-mono text-xs leading-5 text-slate-500">
            Connect your wallet to access your CyborgPunk Profile dashboard.
          </p>
          <div className="mt-5">
            <ConnectNodeButton />
          </div>
        </div>
      </div>
    );
  }

  const registeredProfile =
    profile?.xUsername && profile?.xProfileUrl ? profile : null;
    const eligible = Boolean(
    registeredProfile?.followCompleted && registeredProfile?.engagementCompleted,
  );

  const toggleTask = (taskId: (typeof TASKS)[number]["id"]) => {
    if (!profile) return;

    const nextProfile = {
      ...profile,
      followCompleted:
        taskId === "follow"
          ? !profile.followCompleted
          : profile.followCompleted,
      engagementCompleted:
        taskId === "engagement"
          ? !profile.engagementCompleted
          : profile.engagementCompleted,
    };

    setProfile(nextProfile);
    saveCyborgPunkProfile(nextProfile);
  };

  return (
    <section className="grid gap-4">
      <article className="circuit-frame p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Dashboard // Web3
            </p>
            <h1 className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">
              CYBORGPUNK PROFILE
            </h1>
          </div>
          <span className="hud-chip !px-2 !py-1">
            {eligible ? "WL ELIGIBLE" : "IN PROGRESS"}
          </span>
        </div>

        <div className="mt-4 border border-[#3003D9]/70 bg-[#05010d]/70 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
            Connected wallet
          </p>
          <p className="mt-2 break-all font-mono text-[14px] text-foreground">
            {truncateAddress(address, 6, 6)}
          </p>
          <p className="mt-1 font-mono text-[10px] text-slate-500">
            This wallet is the identity associated with this profile.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/mint" className="hud-chip uppercase">
            EDIT PROFILE
          </Link>
        </div>
      </article>

      {registeredProfile ? (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
                Profile // Web
              </p>
              <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
                X PROFILE
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#0CF1FF]">
              ✓ REGISTERED
            </span>
          </div>

          <a
            href={registeredProfile.xProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block border border-[#0CF1FF]/50 bg-black/50 p-3"
          >
            <p className="font-mono text-[14px] leading-6 text-[#0CF1FF] underline decoration-[#FF2CF0]/70 underline-offset-4 hover:text-[#FF2CF0]">
              @{registeredProfile.xUsername} ↗
            </p>
          </a>
        </article>
      ) : (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Profile // Web
          </p>
          <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
            X PROFILE REQUIRED
          </h2>
          <p className="mt-2 font-mono text-sm leading-6 text-slate-400">
            Register your X profile before the allowlist tasks become
            available.
          </p>
          <Link href="/mint" className="hud-chip mt-4 inline-flex uppercase">
            REGISTER X PROFILE
          </Link>
        </article>
      )}

      {registeredProfile ? (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 shadow-[0_0_18px_rgba(12,241,255,0.08)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
                Registration // Tasks
              </p>
              <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
                WL TASKS
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {eligible ? "COMPLETE" : "PENDING"}
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {TASKS.map((task) => {
              const complete =
                task.id === "follow"
                  ? registeredProfile.followCompleted
                  : registeredProfile.engagementCompleted;

              return (
                <div
                  key={task.id}
                  className="border border-[#3003D9]/60 bg-black/30 p-3"
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
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
            Task verification is manual in this first version. X API
            verification can be connected later without changing the wallet
            identity model.
          </p>
        </article>
      ) : null}
    </section>
  );
}
