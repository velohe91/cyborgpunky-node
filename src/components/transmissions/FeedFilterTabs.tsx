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
      className="mb-8 inline-flex flex-wrap gap-1 rounded-lg border border-neon-cyan/25 bg-black/40 p-1 panel"
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
              "rounded-md px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:px-4 sm:text-xs",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-cyan/70",
              active
                ? "bg-neon-cyan/15 text-neon-cyan box-glow border border-neon-cyan/45"
                : "border border-transparent text-muted hover:border-neon-blue/30 hover:text-foreground",
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
