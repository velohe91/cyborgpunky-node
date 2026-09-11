import type { Metadata } from "next";
import { AboutView } from "@/components/lore/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Genesis Layer // CyborgPunks — compressed identity nodes of CyborgPunks Club.",
};

export default function AboutPage() {
  return <AboutView />;
}
