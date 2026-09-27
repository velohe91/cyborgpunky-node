import type { Metadata } from "next";
import { ArcadeUserDashboard } from "@/components/arcade/ArcadeUserDashboard";

export const metadata: Metadata = {
  title: "Arcade User",
  description: "CyborgPunks Club arcade user dashboard.",
};

export default function ArcadeUserPage() {
  return <ArcadeUserDashboard />;
}
