import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { NeonButton } from "@/components/ui/NeonButton";
import { CyborgPunkProfile } from "@/components/mint/CyborgPunkProfile";
import { MintStageHeader } from "@/components/mint/MintStageHeader";

export const metadata: Metadata = {
  title: "WL Minting Stage",
  description:
    "CyborgPunks Club allowlist quest for the upcoming minting stage.",
};

export default function MintPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-10">
        <MintStageHeader />

        <CyborgPunkProfile />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://opensea.io/collection/arc-cyborgpunks"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-chip inline-flex"
          >
            MINT
          </a>
          <NeonButton href="/arcade" variant="outline">ARCADE</NeonButton>
        </div>

        <p className="mt-6 text-center font-mono text-xs leading-5 text-slate-500">
          Never submit a private key or seed phrase. Only connect a wallet you
          control and provide your public X username.
        </p>
      </div>
    </PageTransition>
  );
}
