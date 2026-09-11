/**
 * NFT Exhibition Node — community artworks acquired by VΣLOHE SYSTEM.
 *
 * HOW TO ADD A PIECE:
 * 1. Add its image, GIF, or video under public/logs/ (or a dedicated public/nfts/community/ folder).
 * 2. Append a NftItem below.
 * 3. Use the OBJKT / marketplace URL in the objkt or marketplace field.
 *
 * IDs use ACQ-### (Acquisition Registry) to keep community acquisitions
 * distinct from canonical CyborgPunk Nodes.
 */

import type { NftItem } from "@/lib/types";

export const communityAcquisitions: NftItem[] = [
  {
id: "ACQ-004",
title: "Signal Rebirth",
image: "/logs/signal-rebirth.gif",
video: "/logs/signal-rebirth.gif",
 description:
"A community acquisition from the DREAMNT collection, now preserved in the VΣLOHE SYSTEM exhibition.",
lore: `NFT acquired from @its_dreamnt
 collection.
Excited to welcome this wonderful, narrative-driven piece into the VΣLOHE SYSTEM metaverse. The asset has been successfully integrated into the exhibition node. Ownership registry updated and cryptographically validated. Signal integrity: STABLE.`,
 series: "After Light Dimension",
 rarity: "rare",
objkt:
 "https://objkt.com/tokens/KT1QLjELiJGcbUkqrRGDVtMPSC1xZggBS4TU/1?ref=tz1LFQHDFX8VzSA1Vyc6sYQdyNGL1KKmwhse",
 status: "Archived",
 year: 2026,
 tags: ["community", "acquisition", "signal", "rebirth", "after-light-dimension"],
 },

  {
id: "ACQ-003",
title: "Kaiju in Tokyo",
image: "/logs/Kaiju-in-Tokyo.gif",
video: "/logs/Kaiju-in-Tokyo.gif",
 description:
"A community acquisition from the Kaiju collection, now preserved in the VΣLOHE SYSTEM exhibition.",
lore: `NFT acquired from @Kaiju_tez collection.
The flawless glitch execution on this piece makes it feel completely native to the VΣLOHE SYSTEM metaverse. The asset has been successfully integrated into the exhibition node. Ownership registry updated and cryptographically validated. Signal integrity: STABLE.`,
 series: "Hey!Kaiju",
 rarity: "mythic",
objkt:
 "https://objkt.com/tokens/KT1E7TR2Gj1KLt19VNh9bYLSrgjgNAR8e8xT/549?ref=tz1LFQHDFX8VzSA1Vyc6sYQdyNGL1KKmwhse",
 status: "Archived",
 year: 2026,
 tags: ["community", "acquisition", "tokyo", "Kaiju"],
 },
  {
    id: "ACQ-002",
    title: "𝙈𝙖𝙩𝙧𝙞𝙭 𝙈𝙞𝙭",
    image: "/logs/matrix-mix.gif",
    video: "/logs/matrix-mix.gif",
    description:
      "A community acquisition from the Ferezila collection, now preserved in the VΣLOHE SYSTEM exhibition.",
    lore: `NFT acquired from @Ferezila collection.

Thrilled to add this amazing piece to the VΣLOHE SYSTEM exhibition.

The asset has been successfully integrated into the exhibition node. Ownership registry updated and cryptographically validated. Signal integrity: STABLE.`,
    series: "Cassette Chronicles 📼",
    rarity: "rare",
    objkt:
      "https://objkt.com/tokens/KT1StD4NB74LmSkkY4EwhuE7HAiQxrpFoE4f/7",
    status: "Archived",
    year: 2026,
    tags: ["community", "acquisition", "matrix-mix", "ferezila"],
  },
  {
    id: "ACQ-001",
    title: "14# NeoPop Pandas",
    image: "/logs/neopop-pandas.jpeg",
    description:
      "A neon panda acquired from the NeoPop Pandas movement and integrated into the community exhibition node.",
    lore: `NFT acquired from @khaleghi_NFT.

More than cute: rebellion wrapped in bubblegum and neon. NeoPop Pandas are here to break the rules — with style.

The asset has been successfully integrated into the exhibition node. Ownership registry updated and cryptographically validated. Signal integrity: STABLE.`,
    series: "NeoPop Pandas",
    rarity: "rare",
    objkt:
      "https://objkt.com/tokens/KT1QLSm9Qs3TRm35fTF1JikyC787P5kM2oRP/13?ref=tz1LFQHDFX8VzSA1Vyc6sYQdyNGL1KKmwhse",
    status: "Archived",
    year: 2026,
    tags: ["community", "acquisition", "neopop-pandas", "khaleghi"],
  },

];
