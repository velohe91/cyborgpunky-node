import type { NftItem } from "@/lib/types";

export const PILOT_STORAGE_KEY = "cyborgpunks.pilotId";
export const PILOT_EVENT = "cyborgpunks-pilot";

export type SpecialId = "xray" | "cloak" | "laser" | "melee" | "breach";

export type PilotSpecial = {
  id: SpecialId;
  name: string;
  blurb: string;
};

const SPECIAL_BY_TOKEN: Record<number, PilotSpecial> = {
  1: {
    id: "xray",
    name: "X-RAY BURST",
    blurb: "violet burst hits every hostile on screen",
  },
  2: {
    id: "cloak",
    name: "PHASE CLOAK",
    blurb: "~3s ghost — no damage",
  },
  3: {
    id: "laser",
    name: "GLITCH LASER",
    blurb: "~4s magenta/cyan laser ammo",
  },
  4: {
    id: "melee",
    name: "OVERCLOCK MELEE",
    blurb: "~3s speed + contact kills",
  },
  5: {
    id: "breach",
    name: "SYSTEM BREACH",
    blurb: "2s lockdown — no enemy fire, x2 damage",
  },
};

export function cpcTokenId(id: string): number {
  const m = id.match(/VEL-CPC(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

export function isCpcPilot(id: string): boolean {
  return id.startsWith("VEL-CPC");
}

export function getPilotSpecial(nft: NftItem): PilotSpecial {
  const n = cpcTokenId(nft.id);
  if (SPECIAL_BY_TOKEN[n]) return SPECIAL_BY_TOKEN[n];
  const cycle = ((Math.max(1, n) - 1) % 5) + 1;
  return SPECIAL_BY_TOKEN[cycle];
}

/** @deprecated use getPilotSpecial — kept so older imports compile */
export function getPilotPerk(nft: NftItem): PilotSpecial {
  return getPilotSpecial(nft);
}

export function readStoredPilotId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PILOT_STORAGE_KEY);
}

export function writeStoredPilotId(id: string): void {
  window.localStorage.setItem(PILOT_STORAGE_KEY, id);
  window.dispatchEvent(new Event(PILOT_EVENT));
}
