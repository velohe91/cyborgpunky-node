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
  common: "text-slate-300 border-slate-500/50",
  rare: "text-neon-cyan border-neon-cyan/60",
  "super-rare": "text-neon-magenta border-neon-magenta/60",
  epic: "text-neon-blue border-neon-blue/60",
  legendary: "text-neon-gold border-neon-gold/60",
  mythic: "text-neon-cyan border-neon-cyan/80",
};
