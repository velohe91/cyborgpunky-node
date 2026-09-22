import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { NeonButton } from "@/components/ui/NeonButton";
import { CyborgPunkProfile } from "@/components/mint/CyborgPunkProfile";

export const metadata: Metadata = {
  title: "WL Minting Stage",
  description:
    "CyborgPunks Club allowlist quest for the upcoming minting stage.",
};

export default function MintPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-10">
        <article className="circuit-frame p-4 sm:p-5">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Mint // Allowlist
          </p>
          <h1 className="mt-2 max-w-full font-sans text-[18px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[24px]">
            WL MINTING STAGE
          </h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <p className="font-mono text-[14px] leading-[1.7] text-foreground/90 sm:text-[16px]">
            Connect your wallet to initialize your CyborgPunk Profile and
            register for the upcoming allowlist.
          </p>
        </article>

        <CyborgPunkProfile />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://x.com/cyborgpunky"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-chip inline-flex"
          >
            OPEN @CYBORGPUNKY
          </a>
          <NeonButton href="/">RETURN TO SYSTEM</NeonButton>
        </div>

        <p className="mt-6 text-center font-mono text-xs leading-5 text-slate-500">
          Never submit a private key or seed phrase. Only connect a wallet you
          control and provide your public X username.
        </p>
      </div>
    </PageTransition>
  );
}
