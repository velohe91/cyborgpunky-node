import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonButton } from "@/components/ui/NeonButton";

export const metadata: Metadata = {
  title: "WL Minting Stage",
  description:
    "CyborgPunks Club allowlist quest for the upcoming minting stage.",
};

const QUEST_STEPS = [
  {
    number: "01",
    title: "FOLLOW THE SIGNAL",
    description:
      "Follow @cyborgpunky on X to receive the collection transmissions.",
  },
  {
    number: "02",
    title: "ENGAGE THE PINNED POST",
    description: "Like and repost the pinned CyborgPunks Club post.",
  },
  {
    number: "03",
    title: "REGISTER YOUR NODE",
    description:
      "Leave your EVM wallet address in a comment on the pinned post. This wallet is used for the WL allowlist.",
  },
] as const;

export default function MintPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-10">
        <SectionHeading
          eyebrow="Mint // Allowlist"
          title="WL MINTING STAGE"
          subtitle="Complete the signal quest to register for the upcoming CyborgPunks Club allowlist."
        />

        <div className="mt-8 grid gap-3">
          {QUEST_STEPS.map((step) => (
            <article
              key={step.number}
              className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 shadow-[0_0_18px_rgba(12,241,255,0.08)] sm:p-5"
            >
              <div className="flex gap-4">
                <span className="shrink-0 font-mono text-sm text-[#0CF1FF]">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-sans text-sm uppercase tracking-[0.08em] text-[#FF2CF0]">
                    {step.title}
                  </h2>
                  <p className="mt-2 font-mono text-sm leading-6 text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

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
          WL registration is currently manual. Do not post a private key or seed phrase.
          Only submit a public EVM wallet address.
        </p>
      </div>
    </PageTransition>
  );
}
