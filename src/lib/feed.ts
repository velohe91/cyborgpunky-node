/**
 * Feed helpers: reading time, sort, era split, and kind filter.
 */

import type { FeedEra, FeedFilter, FeedItem } from "@/lib/types";

/** Average adult reading pace used for estimate (words per minute). */
const WORDS_PER_MINUTE = 200;

/** Pull a sortable epoch string from transmission, broadcast, or log. */
export function getFeedItemSortKey(item: FeedItem): string {
  if (item.kind === "system-log") return item.timestamp;
  return item.date;
}

/** Newest first. Stable-ish string compare on archive clock strings. */
export function sortFeedNewestFirst(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) =>
    getFeedItemSortKey(b).localeCompare(getFeedItemSortKey(a)),
  );
}

/** Oldest first — chronological archive order. */
export function sortFeedOldestFirst(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) =>
    getFeedItemSortKey(a).localeCompare(getFeedItemSortKey(b)),
  );
}

export function filterByEra(items: FeedItem[], era: FeedEra): FeedItem[] {
  return items.filter((i) => i.era === era);
}

export function filterFeedItems(
  items: FeedItem[],
  filter: FeedFilter,
): FeedItem[] {
  if (filter === "all") return items;
  if (filter === "transmissions") {
    return items.filter((i) => i.kind === "transmission");
  }
  if (filter === "broadcasts") {
    return items.filter((i) => i.kind === "broadcast");
  }
  return items.filter((i) => i.kind === "system-log");
}

/** Word-count based reading time; minimum 1 minute. */
export function estimateReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Prefer explicit field, otherwise estimate from content. */
export function getReadingTimeMinutes(
  content: string,
  explicit?: number,
): number {
  if (explicit != null && explicit > 0) return explicit;
  return estimateReadingTimeMinutes(content);
}

export function countByKind(items: FeedItem[]): {
  all: number;
  transmissions: number;
  systemLogs: number;
  broadcasts: number;
} {
  let transmissions = 0;
  let systemLogs = 0;
  let broadcasts = 0;
  for (const item of items) {
    if (item.kind === "transmission") transmissions += 1;
    else if (item.kind === "system-log") systemLogs += 1;
    else broadcasts += 1;
  }
  return {
    all: items.length,
    transmissions,
    systemLogs,
    broadcasts,
  };
}
