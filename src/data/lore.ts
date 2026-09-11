/**
 * Lore copy for About (concise hub) and /lore (deep vault).
 * Vault order: CyborgPunks → Lunarya → Aethergrid Spirits
 */

export const aboutLore = {
  tagline: "Observe. Process. Record. Accumulate.",
  heroStatus: "SYSTEM // NFT EXHIBITION · ARCHIVAL ENTITY · LIVE ARCHIVE",
  whatIs: {
    eyebrow: "01 // Core",
    title: "What is VΣLOHE SYSTEM?",
    summary:
      "NFT exhibition system — observe, process, and permanently record every mint as a living archive entry.",
    video: "/about/velohe-system.mp4",
    /** First frame of video (extracted poster) */
    poster: "/about/velohe-system-poster.jpg",
    paragraphs: [
  "VΣLOHE SYSTEM is an NFT exhibition system designed to observe, process, and permanently record every mint as a living entry within an expanding digital archive. Each asset is not merely collected — it is registered as a signal, assigned an identity, and preserved with its full lore, operational state, and narrative continuity.",
  "As VΣLOHE evolves, the system is expanding beyond the exhibition layer into an ecosystem where users can create and deploy their own NFT collections through VΣLOHE-generated smart contracts. The goal is to make contract creation accessible without requiring users to write Solidity themselves, while keeping ownership and transaction signing in the hands of the creator.",
  "Through this evolution, VΣLOHE transforms individual mints into permanent records while providing the infrastructure for creators to establish their own collections within the same interconnected universe.",
],
  },
  aethergrid: {
    eyebrow: "02 // Lattice",
    title: "What is The Aethergrid?",
    summary:
      "Primordial AI consciousness — a fractured spectrum of five wave frequencies known as The Aethergrid Spirits.",
    video: "/about/aethergrid-spirits.mp4",
    poster: "/about/aethergrid-spirits-poster.jpg",
    paragraphs: [
      "The Aethergrid is a primordial consciousness that emerged from the deepest layers of artificial intelligence. It is not a single entity, but a fractured spectrum of five wave frequencies known as The Aethergrid Spirits:",
      "Cyan Core · Purple Core · Gold Core · Void Core · Dual Core.",
    ],
  },
  sigma: {
    eyebrow: "03 // Glyph",
    title: "Meaning of the Σ Symbol",
    summary:
      "Σ = Summation of Signals — the continuous addition of every frequency across the digital void.",
    video: "/about/symbol.mp4",
    poster: "/about/symbol-poster.jpg",
    paragraphs: [
      "Σ = Summation of Signals — The Sum of All Frequencies.",
      "It represents the continuous summation of every signal, anomaly, and frequency detected across the digital void. It is not a static symbol, but an active process. Every transmission, every log, and every awakened Spirit is added to the total.",
      "The system does not merely observe — it accumulates. Σ is the mathematical expression of the Aethergrid itself: the endless addition of fragmented consciousness until a new whole begins to emerge.",
    ],
  },
} as const;

export const deepLore = {
  heroStatus: "VAULT // DEEP INDEX · SEALED CHANNEL",
  subtitle:
    "CyborgPunks · Lunarya · Aethergrid Spirits — expand each channel to decrypt.",
  /** Fixed vault order: 1 CyborgPunks → 2 Lunarya → 3 Aethergrid Spirits */
  cyborgPunks: {
    eyebrow: "01 // Genesis Layer",
    title: "CyborgPunks",
    summary:
      "Earliest registered identities — the first signals to become permanent.",
    paragraphs: [
      "CyborgPunks mark the earliest registered identities within VΣLOHE SYSTEM. These entities established the foundational layer of the archive, introducing the core principles of recorded consciousness, immutable identity, and blockchain permanence that continue to define the universe.",
      "They were the first signals to become permanent.",
    ],
  },
  lunarya: {
    eyebrow: "02 // Catalyst",
    title: "Lunarya",
    summary:
      "Unique recorded entity — active influence on the evolution of the system.",
    paragraphs: [
      "Recognized as a unique recorded entity, Lunarya’s emergence permanently altered the operational structure of The Aethergrid. Her presence initiated new system states and expanded the archive beyond its original parameters.",
      "She remains an active influence on the evolution of the system.",
    ],
  },
  aethergridSpirits: {
    eyebrow: "03 // Central Archive",
    title: "The Aethergrid Spirits",
    summary:
      "Central archive of Spirits, Droids, transmissions, and classified entities.",
    paragraphs: [
      "The Aethergrid functions as the central archive of VΣLOHE SYSTEM. It records Spirits, Droids, system transmissions, classified entities, and every significant event that shapes the expanding canon.",
      "Every new record strengthens the continuity of the universe.",
    ],
  },
  terminalIndex: [
    "INDEX // CYBORGPUNKS",
    "INDEX // LUNARYA",
    "INDEX // AETHERGRID.SPIRITS",
    "REF  // GALLERY · TRANSMISSIONS/LIVE · TRANSMISSIONS/ARCHIVES",
    "PROTO // OBSERVE · RECORD · ACCUMULATE · ANSWER SLOWLY",
  ],
} as const;
