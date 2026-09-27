"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import { useLockedPilot } from "@/hooks/useLockedPilot";
import { getNftById } from "@/data/nfts";
import { loadCyborgPunkProfile, type CyborgPunkLocalProfile } from "@/lib/allowlist/profile-storage";
import { truncateAddress } from "@/lib/web3/multi-chain";

const SPECIMENS = [
  { id: "VIREX", image: "/mint/specimens/specimen-01.png" },
  { id: "NULLA", image: "/mint/specimens/specimen-02.png" },
  { id: "LYNX", image: "/mint/specimens/specimen-03.png" },
  { id: "STRIPE", image: "/mint/specimens/specimen-04.png" },
  { id: "ARC", image: "/mint/specimens/specimen-05.png" },
  { id: "CYBORGPUNKY", image: "/mint/specimens/specimen-06.png" },
  { id: "UNKNOWN", image: "/mint/specimens/specimen-07.png" },
  { id: "NEON-BYTE BUNNY", image: "/mint/specimens/specimen-08.png" },
] as const;

export function GlobalCyborgPunkProfile() {
  const { address } = useAccount();
  const { pilotId } = useLockedPilot();
  const [profile, setProfile] = useState<CyborgPunkLocalProfile | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (address) setProfile(loadCyborgPunkProfile(address));
    else setProfile(null);
  }, [address]);

  useEffect(() => {
    if (!address) {
      setHighScore(0);
      setTotalScore(0);
      return;
    }

    let cancelled = false;

    fetch(`/api/arcade/score/status?address=${encodeURIComponent(address)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load arcade score.");
        return (await response.json()) as {
          highScore?: number;
          totalScore?: number;
        };
      })
      .then((result) => {
        if (cancelled) return;
        setHighScore(result.highScore ?? 0);
        setTotalScore(result.totalScore ?? 0);
      })
      .catch(() => {
        if (cancelled) return;
        setHighScore(0);
        setTotalScore(0);
      });

    return () => {
      cancelled = true;
    };
  }, [address]);

  const pilot = pilotId ? getNftById(pilotId) : null;

  if (!address) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-10">
        <article className="circuit-frame w-full p-5 sm:p-6">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Profile // Global
          </p>
          <h1 className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">
            CYBORGPUNK PROFILE
          </h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <p className="font-mono text-sm leading-6 text-slate-300">
            Connect your wallet to access your global CyborgPunk activity.
          </p>
          <div className="mt-5">
            <ConnectNodeButton />
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-4xl gap-4 px-3 py-6 sm:px-4 sm:py-10">
      <article className="circuit-frame p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Profile // Global
            </p>
            <h1 className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">
              CYBORGPUNK PROFILE
            </h1>
          </div>
          <span className="hud-chip !px-2 !py-1">ACTIVE NODE</span>
        </div>

        <div className="mt-4 border border-[#3003D9]/70 bg-[#05010d]/70 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
            Connected wallet
          </p>
          <p className="mt-2 break-all font-mono text-[14px] text-foreground">
            {truncateAddress(address, 6, 6)}
          </p>
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Identity // Pilot
            </p>
            <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              SELECTED PILOT
            </h2>
          </div>
          {pilot ? <span className="font-mono text-[10px] text-[#FFC825]">{pilot.id}</span> : null}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {pilot ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pilot.video || pilot.image}
                alt={pilot.title}
                className="h-24 w-24 object-cover"
                style={{ imageRendering: "pixelated", outline: "3px solid #FFC825" }}
              />
              <div>
                <p className="font-sans text-sm uppercase text-[#0CF1FF]">{pilot.title}</p>
                <p className="mt-1 font-mono text-xs text-slate-500">{pilot.rarity}</p>
              </div>
            </>
          ) : (
            <p className="font-mono text-sm text-slate-500">No pilot selected yet.</p>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/arcade" className="hud-chip inline-flex uppercase">
            SELECT PILOT
          </Link>
          <Link href="/arcade?run=1" className="hud-chip inline-flex uppercase">
            START RUN
          </Link>
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
          Activity // Arcade
        </p>
        <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
          ARCADE SCORE
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">High Score</p>
            <p className="mt-2 font-mono text-xl text-[#0CF1FF]">{String(highScore).padStart(6, "0")}</p>
          </div>
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">Total Score</p>
            <p className="mt-2 font-mono text-xl text-[#0CF1FF]">{String(totalScore).padStart(6, "0")}</p>
          </div>
        </div>
        <Link href="/arcade/user" className="hud-chip mt-4 inline-flex uppercase">
          OPEN ARCADE DASHBOARD
        </Link>
      </article>
      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
          Activity // Allowlist
        </p>
        <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
          WL STATUS
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">X Profile</p>
            <p className="mt-2 font-mono text-sm text-foreground">
              {profile?.xUsername ? `@${profile.xUsername}` : "NOT REGISTERED"}
            </p>
          </div>
          <div className="border border-[#3003D9]/60 bg-black/30 p-3">
            <p className="font-mono text-[9px] uppercase text-[#0CF1FF]/70">WL Tasks</p>
            <p className="mt-2 font-mono text-sm text-foreground">
              {profile?.followCompleted && profile?.engagementCompleted ? "COMPLETED" : "IN PROGRESS"}
            </p>
          </div>
        </div>
        <Link href="/mint/user" className="hud-chip mt-4 inline-flex uppercase">
          OPEN WL DASHBOARD
        </Link>
      </article>
      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Specimen // Preview
            </p>
            <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              MINT SPECIMENS
            </h2>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#0CF1FF]/70">
              Cryogenic Room Background
            </p>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            ARC CHAIN // MINT NETWORK
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIMENS.map((specimen) => (
            <div
              key={specimen.id}
              className="group border border-[#3003D9]/60 bg-black/40 p-2"
            >
              <div className="aspect-square overflow-hidden border border-[#0CF1FF]/20 bg-black">
                <img
                  src={specimen.image}
                  alt={specimen.id}
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

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href="https://opensea.io/collection/arc-cyborgpunks"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-chip inline-flex uppercase"
        >
          MINT
        </a>
        <Link href="/arcade" className="hud-chip inline-flex uppercase">
          ARCADE
        </Link>
      </div>
    </main>
  );
}
