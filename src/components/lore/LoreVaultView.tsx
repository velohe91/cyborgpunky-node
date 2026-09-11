"use client";

import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ExpandableLoreCard } from "@/components/lore/ExpandableLoreCard";
import { TerminalNote } from "@/components/lore/TerminalNote";
import { NeonButton } from "@/components/ui/NeonButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { deepLore } from "@/data/lore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LoreVaultView() {
  const reduced = usePrefersReducedMotion();

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <GlowOrb className="left-0 top-16 h-40 w-40 opacity-80" color="blue" />

        <SectionHeading
          eyebrow="Vault // Deep Index"
          title="Full Lore & Archives"
          subtitle={deepLore.subtitle}
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-10"
        >
          <TerminalNote
            label="sealed channel"
            tone="violet"
            lines={[deepLore.heroStatus, ...deepLore.terminalIndex]}
          />
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* 1. CyborgPunks */}
          <ExpandableLoreCard
            tone="violet"
            defaultOpen
            eyebrow={deepLore.cyborgPunks.eyebrow}
            title={deepLore.cyborgPunks.title}
            summary={deepLore.cyborgPunks.summary}
            paragraphs={[...deepLore.cyborgPunks.paragraphs]}
            delay={0.05}
          />

          {/* 2. Lunarya */}
          <ExpandableLoreCard
            tone="violet"
            eyebrow={deepLore.lunarya.eyebrow}
            title={deepLore.lunarya.title}
            summary={deepLore.lunarya.summary}
            paragraphs={[...deepLore.lunarya.paragraphs]}
            delay={0.08}
          />

          {/* 3. Aethergrid Spirits */}
          <ExpandableLoreCard
            tone="violet"
            eyebrow={deepLore.aethergridSpirits.eyebrow}
            title={deepLore.aethergridSpirits.title}
            summary={deepLore.aethergridSpirits.summary}
            paragraphs={[...deepLore.aethergridSpirits.paragraphs]}
            delay={0.1}
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <NeonButton href="/about" variant="outline">
            Back to About
          </NeonButton>
          <NeonButton href="/gallery">Open Gallery</NeonButton>
          <NeonButton href="/transmissions" variant="ghost">
            Transmissions
          </NeonButton>
        </div>
      </div>
    </PageTransition>
  );
}
