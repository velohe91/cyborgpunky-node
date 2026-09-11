/**
 * Game Protocol whitepaper — structured vision document for /game/whitepaper.
 * v2.0.0 — Five Game Protocols architecture.
 *
 * Content-only update; page design unchanged.
 *
 * Edit sections here; GameWhitepaperView renders them automatically.
 */

export type WhitepaperSection = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const gameWhitepaperMeta = {
  title: "VΣLOHE SYSTEM — GAME WHITEPAPER",
  tagline: "Build your Nexus. Expand the Network. Reach the Aethergrid.",
  version: "v2.0.0",
  status: "GAME IN DEVELOPMENT · ACTIVE DEVELOPMENT",
} as const;

export const gameWhitepaperSections: WhitepaperSection[] = [
  {
  id: "genesis-protocol",
  number: "01",
  title: "GENESIS PROTOCOL",
  paragraphs: [
    "The game is an interactive extension of the VΣLOHE SYSTEM universe.",
    "It is designed as a playable environment where players can explore, build, discover, and interact with an expanding network of digital entities.",
    "At the center of this system is the Operator — the player who enters the network and establishes their presence within it.",
    "VΣLOHE SYSTEM defines the systems that connect gameplay, progression, digital entities, and ownership within the universe.",
  ],
  bullets: [
  "Operator — Player Identity",
  "Gameplay — Exploration & Progression",
  "Universe — Connected Entities",
  "VΣLOHE SYSTEM — Game Architecture",
],
},

  {
    id: "nexus-protocol",
    number: "02",
    title: "NEXUS PROTOCOL",
    paragraphs: [
      "The Nexus is the Operator's primary point of interaction with the game.",
      "It represents the player's operational space within the system and provides the foundation from which progression, resources, exploration, and interaction begin.",
      "Through the Nexus, players gradually establish their position within the Network and gain access to deeper systems and discoveries.",
      "The game world is structured around interconnected systems rather than a single linear experience.",
      "The Nexus is not simply a menu or interface. It is the player's connection point to the VΣLOHE SYSTEM.",
    ],
    bullets: [
      "Digital home base of the Operator",
      "Foundation for progression and expansion",
      "Connection point to the wider Network",
      "Starting point for exploration and discovery",
    ],
  },

  {
    id: "entity-protocol",
    number: "03",
    title: "ENTITY PROTOCOL",
    paragraphs: [
      "The VΣLOHE SYSTEM is populated by a growing network of digital entities.",
      "Some entities originate within the game, while others are connected to the wider VΣLOHE SYSTEM universe.",
      "Among the known entities are NeoByte Bunnies, CyborgPunks, Aethergrid Spirits, and Aethergrid Droids.",
      "Each represents a different role within the evolving system, creating an interconnected network of production, exploration, discovery, and defense.",
      "These entities are not isolated characters. They are components of a larger system whose relationships will continue to expand as GAME PROTOCOL develops.",
    ],
    bullets: [
  "NeoByte Bunnies — Workforce",
  "CyborgPunks — Exploration",
  "Aethergrid Spirits — Discovery",
  "Aethergrid Droids — Defense",
],
  },

  {
    id: "ownership-protocol",
    number: "04",
    title: "OWNERSHIP PROTOCOL",
    paragraphs: [
      "The game introduces a Web3 layer through VΣLOHE SYSTEM, designed around digital ownership.",
      "Selected digital assets within the VΣLOHE ecosystem may exist as blockchain-based assets, allowing ownership and provenance to extend beyond a traditional game account.",
      "This creates two complementary layers: the Game Layer and the Ownership Layer.",
      "The Game Layer provides the interactive experience, progression, exploration, and discovery. The Ownership Layer allows selected digital assets to exist as verifiable objects within the broader ecosystem.",
      "NFTs therefore are not simply collectibles. They represent a persistent ownership layer for selected elements of the VΣLOHE SYSTEM.",
      "Web3 is not intended to replace gameplay. It extends the relationship between the player and the digital world.",
    ],
    bullets: [
  "Digital Assets",
  "Verifiable Ownership",
  "Persistent Identity",
  "Asset Utility",
  "Ecosystem Participation",
],
  },

  {
    id: "aethergrid-protocol",
    number: "05",
    title: "AETHERGRID PROTOCOL",
    paragraphs: [
      "The ultimate objective of the game is exploration.",
      "Beyond the known Network lies the Aethergrid — an unknown system whose discovery represents one of the central mysteries of the VΣLOHE SYSTEM.",
      "The path toward the Aethergrid connects gameplay, exploration, digital entities, and the evolution of the ecosystem.",
      "As VΣLOHE SYSTEM develops, new systems, entities, environments, and forms of interaction may become part of the Network.",
      "The protocol is therefore designed as an evolving framework rather than a static game.",
    ],
    bullets: [
      "Build your Nexus",
      "Expand the Network",
      "Discover the Entities",
      "Explore the unknown",
      "Reach the Aethergrid",
    ],
  },
];