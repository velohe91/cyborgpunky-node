import type { Metadata } from "next";
import { ArcadeRun } from "@/components/arcade/ArcadeRun";

export const metadata: Metadata = {
  title: "Arcade",
  description: "CyborgPunks Club arcade — select a VEL-CPC pilot and rail-dodge.",
};

export default function ArcadePage() {
  return <ArcadeRun />;
}
