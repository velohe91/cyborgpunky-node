/**
 * Soft neon ambient orbs for depth behind content.
 */
export function GlowOrb({
  className = "",
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "blue" | "magenta" | "gold";
}) {
  const bg =
    color === "magenta"
      ? "bg-neon-magenta/20"
      : color === "gold"
        ? "bg-neon-gold/20"
        : color === "cyan"
          ? "bg-neon-cyan/20"
          : "bg-neon-blue/20";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${bg} ${className}`}
    />
  );
}
