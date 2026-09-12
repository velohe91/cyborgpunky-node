import type { ReactNode } from "react";

/**
 * Split-energy circuit plate: magenta left, cyan right, chamfered corners.
 */
export function CircuitFrame({
  children,
  className = "",
  crosshair = false,
}: {
  children: ReactNode;
  className?: string;
  crosshair?: boolean;
}) {
  return (
    <div className={`circuit-frame ${className}`}>
      {crosshair && (
        <span
          className="circuit-crosshair pointer-events-none absolute inset-x-0 top-0 z-10 h-0"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
