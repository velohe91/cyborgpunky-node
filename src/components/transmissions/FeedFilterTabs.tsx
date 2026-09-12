"use client";

import type { FeedFilter } from "@/lib/types";

const TABS: {
  id: FeedFilter;
  label: string;
  countKey: "all" | "transmissions" | "systemLogs" | "broadcasts";
}[] = [
  { id: "all", label: "All", countKey: "all" },
  { id: "broadcasts", label: "Broadcasts", countKey: "broadcasts" },
  { id: "transmissions", label: "Transmissions", countKey: "transmissions" },
  { id: "system-logs", label: "System Logs", countKey: "systemLogs" },
];

export function FeedFilterTabs({
  value,
  onChange,
  counts,
}: {
  value: FeedFilter;
  onChange: (next: FeedFilter) => void;
  counts: {
    all: number;
    transmissions: number;
    systemLogs: number;
    broadcasts: number;
  };
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter feed"
      className="circuit-frame mb-8 inline-flex flex-wrap gap-1 bg-black p-1"
    >
      {TABS.map((tab) => {
        const active = value === tab.id;
        const count = counts[tab.countKey];
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            id={`feed-tab-${tab.id}`}
            className={[
              "px-3 py-2 font-sans text-[11px] uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[12px]",
              "focus-visible:outline-none",
              active
                ? "text-neon-cyan"
                : "text-muted hover:text-[#FF2CF0]",
            ].join(" ")}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            <span
              className={`ml-2 tabular-nums ${active ? "text-neon-cyan/80" : "text-muted/60"}`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
