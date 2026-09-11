/**
 * NFT VeLozArt Gallery catalog.
 *
 * Media layout (exact public paths):
 *   image → /nfts/velozart/images/VeLozArt-00X.jpg
 *   video → /nfts/velozart/videos/VeLozArt-00X.gif
 *
 * HOW TO ADD A PIECE:
 * 1. Drop still JPG into  public/nfts/velozart/images/
 * 2. Drop motion GIF into public/nfts/velozart/videos/
 * 3. Append an object to `velozartCatalog` below
 *
 * rarity: common | rare | super-rare | epic | legendary | mythic
 */

import type { NftItem } from "@/lib/types";
import { nftIdNumber } from "@/data/nfts";

/** Source catalog — append new pieces at the end (display sorts newest first). */
const velozartCatalog: NftItem[] = [
  {
    id: "VeLozArt-001",
    title: "The Tree of Life Vol. 1",
    image: "/nfts/velozart/images/VeLozArt-001.jpg",
    video: "/nfts/velozart/videos/VeLozArt-001.gif",
    description:
      "The Tree of Life reveals the deep connections between the physical world and spiritual teachings. Water, Fire, Air, and Earth — the four elements of nature — sustain all existence.",
    lore: `The Tree of Life stands as a conceptual and spiritual map of existence. Through the four elemental forces — Water, Fire, Air, and Earth — it allows us to understand both the physical structure of the universe and the profound spiritual teachings upon which all life depends.`,
    series: "VeLozArt",
    rarity: "mythic",
    objkt:
      "https://objkt.com/collections/KT1JvJ68JZqkwBLGGejSxsHZsq6bPxcRDKLk",
    tags: ["tree-of-life", "elements", "spiritual"],
  },
  {
    id: "VeLozArt-002",
    title: "Biopunk Faces",
    image: "/nfts/velozart/images/VeLozArt-002.jpg",
    video: "/nfts/velozart/videos/VeLozArt-002.gif",
    description:
      "A collection of striking Latin women with detailed, symmetric hazel eyes. Designed to bring color, intensity, and beauty to any NFT collection.",
    lore: `In a neon-lit, high-tech dystopian future, the Biopunk Faces emerge at the intersection of raw human emotion and cybernetic evolution. Featuring Latin women with intensely detailed and perfectly symmetric hazel eyes, these figures embody organic life enhanced by advanced biotechnology. Each face carries its own story — from the cosmic glow of Aurora to the celestial grace of Venus and the fierce individuality of Lucy — serving as vibrant, sentient anchors of color, soul, and beauty within the digital grid.`,
    series: "VeLozArt",
    rarity: "rare",
    objkt:
      "https://objkt.com/collections/KT1Sp7AXSqsCoA16s2rxL6yrTa7WFqjw64w3",
    tags: ["biopunk", "faces", "portrait"],
  },
  {
    id: "VeLozArt-003",
    title: "Ballet Dancer",
    image: "/nfts/velozart/images/VeLozArt-003.jpg",
    video: "/nfts/velozart/videos/VeLozArt-003.gif",
    description:
      "An Impressionist oil painting series of elegant ballet dancers performing in the rain, with visible brushstrokes. Created to bring classical beauty and movement into your collection.",
    lore: `In a realm where ethereal grace meets the melancholic beauty of the elements, the Ballet Dancer collection tells the story of elegant figures who defy the storm. They perform timeless routines while dancing gracefully in the rain. Each dancer — Pamela, Amelia, Judy, and others — embodies an impressionistic vision of movement and emotion. Visible brushstrokes bring their world to life, positioning them as romantic guardians of the stage, ready to bring classical elegance and deep artistic presence into your collection.`,
    series: "VeLozArt",
    rarity: "legendary",
    objkt:
      "https://objkt.com/collections/KT1Lzbkt28CyQo2GW2omhKQkFc1yzDFS81t7",
    tags: ["ballet", "impressionist", "dance"],
  },
  {
    id: "VeLozArt-004",
    title: "Watercolor Arts",
    image: "/nfts/velozart/images/VeLozArt-004.jpg",
    video: "/nfts/velozart/videos/VeLozArt-004.gif",
    description:
      "A complete gallery of original watercolor-style artworks. Soft, fluid, and full of quiet emotion.",
    lore: `In a serene, dreamlike world captured through soft watercolor strokes, the Watercolor Arts collection invites the viewer into quiet sanctuaries and hidden kingdoms. From peaceful moments like “A quiet night at home” and “A quiet day at home” to the enchanted secrets of Dark Fantasy Castle and Fantasy Castle, each piece tells a story of warm memories and timeless spaces. Painted with fluid washes of color and delicate light, this collection becomes a living canvas where nostalgia, home, and imagination flow together.`,
    series: "VeLozArt",
    rarity: "super-rare",
    objkt:
      "https://objkt.com/collections/KT1LHNnUxB7jSwjfuAaNRhfdJ9QQCxupZKr5",
    tags: ["watercolor", "fantasy", "home"],
  },
  {
    id: "VeLozArt-005",
    title: "NeonByte Bunnies",
    image: "/nfts/velozart/images/VeLozArt-005.png",
    video: "/nfts/velozart/videos/VeLozArt-005.gif",
    description:
      "A vibrant NFT collection where adorable cyber rabbits come to life through futuristic fashion, neon aesthetics, and endless personality.",
    lore: `Every NeonByte Bunny is an autonomous process running inside the VΣLOHE SYSTEM. They are never seen by ordinary users, yet every operation inside the VΣLOHE SYSTEM depends on them. Every NeonByte Bunny is an autonomous background process silently executing to keep the system alive.

"If the NeonByte Bunnies ever stop running... the VΣLOHE SYSTEM stops dreaming." `,
    series: "VeLozArt",
    rarity: "mythic",
    marketplace: "https://opensea.io/collection/neonbyte-bunnies",
    tags: ["neonbyte", "bunnies", "workforce"],
  },
];

/** Public catalog — newest first (VeLozArt-005 → 001). */
export const velozartNfts: NftItem[] = [...velozartCatalog].sort(
  (a, b) => nftIdNumber(b.id) - nftIdNumber(a.id),
);

export function getVelozArtById(id: string): NftItem | undefined {
  return velozartCatalog.find((n) => n.id === id);
}
