/**
 * Short terminal-style system logs.
 * Live channel labels: TX-000 · LOG-000
 * Merged/sorted in data/feed.ts.
 */

import type { SystemLogEntry } from "@/lib/types";

export const systemLogs: SystemLogEntry[] = [
  {
    kind: "system-log",
    era: "live",
    id: "LOG-001",
    timestamp: "2026.09.11_00:01",
    level: "INFO",
    title: "Cryogenic Room activated",
    status: "ACTIVE",
    message: `Stasis lock engaged.

CPC nodes available.`,
  },
];
