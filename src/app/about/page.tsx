import type { Metadata } from "next";
import { AboutView } from "@/components/lore/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Official primer: VΣLOHE SYSTEM, The Aethergrid, and the meaning of Σ — Summation of Signals.",
};

export default function AboutPage() {
  return <AboutView />;
}
