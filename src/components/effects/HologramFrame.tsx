import type { ReactNode } from "react";

/** Circuit plate wrapper (legacy name kept for existing imports). */
export function HologramFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`circuit-frame ${className}`}>{children}</div>;
}
