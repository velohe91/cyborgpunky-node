# AGENTS.md

This repo is already a working Next.js gallery (`velohe-system-gallery` → `cyborgpunky-node`).

Keep the existing architecture. Identity, routes, and skin only.

## Non-negotiables

- Do **not** rewrite the architecture.
- Do **not** touch `NftGrid` / `NftModal` except styles.
- Do **not** add wallet or marketplace features.

## Brand

- Visible brand: **CyborgPunks Club**
- Remove **VΣLOHE SYSTEM** from header, home, and titles.
- Package name: `cyborgpunky-node`

## Nav / routes

- Nav: Home, Transmissions, Cryogenic Room, About
- Home primary CTA: **ENTER THE ROOM** → `/cryogenic-room`
- `/cryogenic-room` reuses `NftGrid` + `NftModal` with CyborgPunks data (`VEL-CPC*` and `CBPS`)

## Chrome

- Ticker only: BTC // ETH // SOL // XTZ // POL
- Home boot:
  - `> CRYOGENIC SYSTEM ACTIVATED`
  - `> SYSTEM ONLINE`

## Skin

- Fonts: Press Start 2P (UI arcade) + VT323 (lore)
- Colors: `#0CF1FF` `#3003D9` `#DB3FFD` `#FFC825` on `#05010d`
