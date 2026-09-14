"use client";

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
      <div className="relative mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-8">
        <article className="circuit-frame p-4 sm:p-5">
          <h1 className="max-w-full font-sans text-[18px] tracking-wide text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[24px]">
            GENESIS LAYER // CYBORGPUNKS
          </h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <div className="whitespace-pre-line font-mono text-[16px] leading-[1.7] text-foreground/90">
            {GENESIS_BODY}
          </div>
        </article>

        <div className="mt-6 flex flex-wrap gap-2">
          <NeonButton href="/cryogenic-room">Enter the Room</NeonButton>
          <NeonButton href="/transmissions" variant="outline">
            Read Logs
          </NeonButton>
        </div>
      </div>
    </PageTransition>
  );
}
