"use client";

import type { FeedEra } from "@/lib/types";

const ERAS: {
  id: FeedEra;
  label: string;
  hint: string;
}[] = [
  { id: "live", label: "Live Feed", hint: "TX-000 · LOG-000" },
  { id: "archive", label: "Archives", hint: "Sealed channel" },
];

export function EraTabs({
  value,
  onChange,
  counts,
}: {
  value: FeedEra;
  onChange: (next: FeedEra) => void;
  counts: { live: number; archive: number };
}) {
  return (
    <div
      role="tablist"
      aria-label="Feed era"
      className="circuit-frame mb-4 inline-flex flex-wrap gap-1 bg-black p-1"
    >
      {ERAS.map((era) => {
        const active = value === era.id;
        const count = counts[era.id];
        const isArchive = era.id === "archive";
        return (
          <button
            key={era.id}
            type="button"
            role="tab"
            aria-selected={active}
            id={`era-tab-${era.id}`}
            title={era.hint}
            className={[
              "px-3 py-2.5 font-sans text-[11px] uppercase tracking-[0.12em] transition-colors sm:px-5 sm:text-[12px]",
              "focus-visible:outline-none",
              active && !isArchive
                ? "text-neon-cyan"
                : active && isArchive
                  ? "text-[#FF2CF0]"
                  : "text-muted hover:text-[#FF2CF0]",
            ].join(" ")}
            onClick={() => onChange(era.id)}
          >
            {era.label}
            <span
              className={`ml-2 tabular-nums ${
                active
                  ? isArchive
                    ? "text-violet-300/80"
                    : "text-neon-cyan/80"
                  : "text-muted/60"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
