import type { Metadata } from "next";
import { AboutView } from "@/components/lore/AboutView";

export const metadata: Metadata = {
  title: "About // CyborgPunks Club",
  description:
    "A guide to the CyborgPunks Club Web3 hub, its collections, Cryogenic Room, Arcade, profiles, market signals, and future deployments.",
};

export default function AboutPage() {
  return <AboutView />;
}
