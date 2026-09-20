import type { Metadata } from "next";
import { LabViewport } from "./LabViewport";

export const metadata: Metadata = {
  title: "Cryogenic Room // Lab",
  description:
    "CyborgPunks Club generation lab — live DNA / GENERATE / PREVIEW at cyborgpunks.xyz.",
};

export default function CryogenicLabPage() {
  return <LabViewport />;
}
