"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { loadCyborgPunkProfile } from "@/lib/allowlist/profile-storage";

export function MintStageHeader() {
  const { address } = useAccount();
  const [profileRegistered, setProfileRegistered] = useState(false);

  useEffect(() => {
    if (!address) {
      setProfileRegistered(false);
      return;
    }

    const profile = loadCyborgPunkProfile(address);
    setProfileRegistered(Boolean(profile?.xUsername && profile?.xProfileUrl));
  }, [address]);

  return (
    <article className="circuit-frame p-4 sm:p-5">
      <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
        {profileRegistered ? "WL // Minting Stage" : "Mint // Allowlist"}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="max-w-full font-sans text-[18px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[24px]">
          WL MINTING STAGE
        </h1>
        <Link
          href="/mint/user"
          className="hud-chip inline-flex shrink-0 uppercase"
        >
          WL DASHBOARD
        </Link>
      </div>
      <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
      <p className="font-mono text-[14px] leading-[1.7] text-foreground/90 sm:text-[16px]">
        {profileRegistered
          ? "Your wallet is eligible for the upcoming allowlist."
          : "Connect your wallet to initialize your CyborgPunk Profile and register for the upcoming allowlist."}
      </p>
    </article>
  );
}
