import type { Metadata } from "next";
import { TransmissionCard } from "@/components/transmissions/TransmissionCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageTransition } from "@/components/ui/PageTransition";
import { transmissions } from "@/data/transmissions";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Short public transmissions from the CyborgPunks Club network.",
};

export default function TransmissionsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="circuit-frame mb-6 p-4 sm:p-5 [&>header]:mb-0">
          <SectionHeading
            eyebrow="COMMS // OUTER MESH"
            title="TRANSMISSIONS"
            subtitle="Public signals from the CyborgPunks Club network. New developments, sent without the noise."
          />
        </div>

        <section aria-label="CyborgPunks Club transmissions" className="relative">
          <div
            className="absolute bottom-0 left-[5px] top-0 w-px bg-[#FF2CF0]/60"
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            {transmissions.map((transmission, index) => (
              <TransmissionCard
                key={transmission.id}
                entry={transmission}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
