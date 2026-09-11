"use client";

import { GlowOrb } from "@/components/effects/GlowOrb";
import { NeonButton } from "@/components/ui/NeonButton";
import { PageTransition } from "@/components/ui/PageTransition";

const GENESIS_BODY = `CyborgPunks Club is a collection of compressed identity nodes.

Each CyborgPunk functions as a visual identity unit designed to be recognized by VΣLOHE SYSTEM. These assets represent characters, avatars and narrative entities. They exist as authenticated identity states, encoded in pixel-based form.

CyborgPunks originated as a solution to identity persistence during early system iterations, where observer presence could not reliably survive session decay. By compressing identity into a visual node, recognition became independent of sessions, platforms, or layers.

Ownership of a CyborgPunk enables system-level recognition. This recognition may be referenced by VΣLOHE SYSTEM across future deployments.

This collection promises utilities, rewards and narrative authority. Its function is for identity recognition and archival within the system.

Each asset is documented as an individual ASSET NODE.`;

export function AboutView() {
  return (
    <PageTransition>
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <GlowOrb className="right-0 top-10 h-48 w-48" color="cyan" />

        <article className="panel border border-neon-cyan/25 p-5 sm:p-8">
          <h1 className="font-sans text-[12pt] tracking-wide text-neon-cyan text-glow-sm sm:text-[14pt]">
            GENESIS LAYER // CYBORGPUNKS
          </h1>
          <div className="mt-6 whitespace-pre-line font-mono text-[13.5pt] leading-[1.55] text-foreground/90">
            {GENESIS_BODY}
          </div>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <NeonButton href="/cryogenic-room">Enter the Room</NeonButton>
          <NeonButton href="/transmissions" variant="outline">
            Read Logs
          </NeonButton>
        </div>
      </div>
    </PageTransition>
  );
}
