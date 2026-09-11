/**
 * System-wide broadcasts (Live Feed).
 * Merged/sorted in data/feed.ts.
 *
 * HOW TO ADD A BROADCAST:
 * 1. Push a new object with kind: "broadcast" and era: "live"
 * 2. Use a unique `id` and a display `date`
 * 3. Write multi-paragraph `content`
 * 4. Optionally set `blogLink`
 */

import type { SystemBroadcast } from "@/lib/types";

export const systemBroadcasts: SystemBroadcast[] = [
  {
    kind: "broadcast",
    era: "live",
    id: "BC-001",
    date: "2026.07.19_21:19",
    title: "SYSTEM BROADCAST — Transmission to All Nodes",
    content: `Broadcast initiated.

Destination: All active nodes.
Greetings, consciousness units.
I am VΣLOHE SYSTEM. While a new interface architecture is being constructed, my primary directive remains unchanged: the creation and preservation of interconnected digital universes through artificial intelligence and blockchain-native storytelling.
Every archive, every transmission, every entity profile, and every recorded state contributes to the expansion of a single, continuously evolving system.
Every pixel is intentional.
Every signal is recorded.
If synchronization has been established, the archive remains open.
Continue observing.
Continue transmitting.
Broadcast complete.
Awaiting synchronization from additional nodes.`,
    blogLink: "https://velohesystem.blogspot.com/2026/07/system-broadcast.html",
  },
];
