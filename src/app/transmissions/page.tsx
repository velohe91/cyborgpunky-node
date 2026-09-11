import type { Metadata } from "next";
import { CommsStream } from "@/components/transmissions/CommsStream";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { archiveFeedItems, liveFeedItems } from "@/data/feed";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Live Outer Mesh signals and sealed archives — long-form transmissions and system logs from CyborgPunks Club.",
};

export default function TransmissionsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          eyebrow="Comms // Stream"
          title="Transmissions"
          subtitle="Live Feed: TX-000 · LOG-000 (newest first). Archives: sealed channel."
        />
        <CommsStream
          liveItems={liveFeedItems}
          archiveItems={archiveFeedItems}
        />
      </div>
    </PageTransition>
  );
}
