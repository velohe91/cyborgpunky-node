/**
 * Mixed chronological feeds:
 * Live = TX-000 · LOG-000 (newest first)
 * Archives = sealed TX/LOG records (newest first)
 */

import { systemBroadcasts } from "@/data/broadcasts";
import { transmissionArticles } from "@/data/transmissions";
import { systemLogs } from "@/data/system-logs";
import { filterByEra, sortFeedNewestFirst } from "@/lib/feed";
import type { FeedItem } from "@/lib/types";

const allItems: FeedItem[] = [
  ...systemBroadcasts,
  ...transmissionArticles,
  ...systemLogs,
];

/** Live channel — newest first (TX-000 · LOG-000). */
export const liveFeedItems: FeedItem[] = sortFeedNewestFirst(
  filterByEra(allItems, "live"),
);

/** Sealed archives — newest first. */
export const archiveFeedItems: FeedItem[] = sortFeedNewestFirst(
  filterByEra(allItems, "archive"),
);

/** Full corpus (both eras), newest first — tooling / future use. */
export const feedItems: FeedItem[] = sortFeedNewestFirst(allItems);
