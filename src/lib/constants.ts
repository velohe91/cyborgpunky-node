/**
 * App-wide constants: routes, branding, and chrome copy.
 */

export const SITE_NAME = "CyborgPunks Club";
export const SITE_TAGLINE = "Cryogenic System";
export const SITE_VERSION = "v2.0";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/transmissions", label: "Transmissions" },
  { href: "/cryogenic-room", label: "Cryogenic Room" },
  { href: "/about", label: "About" },
] as const;

export const RARITY_COLORS: Record<string, string> = {
  common: "text-slate-300 border-slate-500/60",
  rare: "text-neon-cyan border-neon-cyan/80",
  "super-rare": "text-[#FF2CF0] border-[#FF2CF0]/80",
  epic: "text-neon-magenta border-neon-magenta/80",
  legendary: "text-neon-gold border-neon-gold/80",
  mythic: "text-neon-cyan border-neon-cyan/80",
};
