"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { PageTransition } from "@/components/ui/PageTransition";

const SECTIONS = [
  {
    eyebrow: "01 // Club",
    title: "What is CyborgPunks Club?",
    body: [
      "CyborgPunks Club is a Web3 hub built around the CyborgPunks NFT ecosystem. It brings collection identities, live market access, mints, community signals, on-chain identity, and interactive systems into one place.",
      "The club is not only a gallery. It is an interface for interacting with the collection and the systems being built around it: discover identities, follow new deployments, connect a wallet, play the Arcade, track live market signals, and access the Cryogenic Room where new identities originate.",
    ],
  },
  {
    eyebrow: "02 // Collection",
    title: "CyborgPunks",
    body: [
      "CyborgPunks began as an Ethereum NFT collection and its Genesis layer establishes the original on-chain identity of the project. As the ecosystem expands, new collections can be deployed on other chains while remaining part of the wider CyborgPunks network.",
      "The current expansion on ARC is an example of this multi-chain direction, with a 2,222 supply collection being launched as a new deployment. Each chain can introduce its own collection, minting environment, and distribution while preserving the CyborgPunks identity.",
    ],
  },
  {
    eyebrow: "03 // Cryogenic Room",
    title: "Where CyborgPunks Come From",
    body: [
      "The Cryogenic Room is the laboratory of the CyborgPunks ecosystem. It is the place where identities are assembled from their underlying DNA and where the visual traits that define a CyborgPunk are organized into a generative system.",
      "The Room connects the creative layer with the on-chain layer: live CyborgPunks on Ethereum can be explored there, newly minted identities can appear automatically, and the generation laboratory provides the environment for creating future identities and collections.",
    ],
  },
  {
    eyebrow: "04 // Web3 Layer",
    title: "A Connected On-Chain Interface",
    body: [
      "CyborgPunks Club uses Web3 functionality to connect the interface with blockchain identity. When a wallet is connected, the user can access a personal CyborgPunk Profile tied to that wallet and interact with features that require wallet identity.",
      "The interface also exposes live market signals through the crypto ticker, provides direct access to active marketplace and minting destinations, and keeps blockchain interaction centered around the user's own wallet and signed actions.",
    ],
  },
  {
    eyebrow: "05 // Arcade",
    title: "Play. Score. Register.",
    body: [
      "The Arcade is the interactive layer of the Club. Players can connect their wallet, enter the game, and build a persistent score record.",
      "Confirmed scores can be saved to the player's Arcade profile, including their high score and accumulated score. Arcade participation can also become part of future Club systems, including potential WL or eligibility mechanisms for future deployments.",
    ],
  },
  {
    eyebrow: "06 // Club Access",
    title: "A Living Network",
    body: [
      "The Club is designed to grow as new collections, mints, games, market events, and community systems come online. The Transmissions section communicates new developments, while the Cryogenic Room, Arcade, Profile, and market interfaces provide places to interact with them.",
      "The goal is simple: give CyborgPunks a single place to discover what exists, connect their identity, participate in the ecosystem, and follow where the network goes next.",
    ],
  },
] as const;

export function AboutView() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="circuit-frame mb-6 p-4 sm:p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0CF1FF]">
            CLUB // SYSTEM INDEX
          </div>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <h1 className="font-sans text-[20px] tracking-wide text-[#FF2CF0] sm:text-[28px]">
            ABOUT CYBORGPUNKS CLUB
          </h1>
          <p className="mt-3 max-w-3xl font-mono text-[14px] leading-[1.6] text-foreground/80 sm:text-[15px]">
            A Web3 interface for the CyborgPunks ecosystem — collections,
            mints, market signals, on-chain identity, Arcade systems, and the
            Cryogenic Room.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {SECTIONS.map((section) => (
            <section key={section.eyebrow} className="circuit-frame p-4 sm:p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0CF1FF]">
                {section.eyebrow}
              </div>
              <h2 className="mt-2 font-sans text-[17px] tracking-wide text-[#FF2CF0] sm:text-[20px]">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 font-mono text-[14px] leading-[1.65] text-foreground/85">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <NeonButton href="/cryogenic-room">Enter the Room</NeonButton>
          <NeonButton href="/arcade" variant="outline">
            Enter the Arcade
          </NeonButton>
          <NeonButton href="/transmissions" variant="outline">
            Read Transmissions
          </NeonButton>
        </div>
      </div>
    </PageTransition>
  );
}
