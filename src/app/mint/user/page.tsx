import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { CyborgPunkUserDashboard } from "@/components/mint/CyborgPunkUserDashboard";

export const metadata: Metadata = {
  title: "CyborgPunk Profile",
  description: "CyborgPunk user dashboard and allowlist status.",
};

export default function MintUserPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-10">
        <CyborgPunkUserDashboard />
      </main>
    </PageTransition>
  );
}
