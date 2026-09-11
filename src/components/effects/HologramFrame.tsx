import type { ReactNode } from "react";

/** Wrapper that applies the rotating holographic border effect. */
export function HologramFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`hologram-border rounded-lg ${className}`}>{children}</div>
  );
}
