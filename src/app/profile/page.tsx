import type { Metadata } from "next";
import { GlobalCyborgPunkProfile } from "@/components/profile/GlobalCyborgPunkProfile";

export const metadata: Metadata = {
  title: "CyborgPunk Profile",
  description: "Global CyborgPunk activity dashboard.",
};

export default function ProfilePage() {
  return <GlobalCyborgPunkProfile />;
}
