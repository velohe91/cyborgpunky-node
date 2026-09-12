/**
 * Split-energy plate glow — hard layers, no photographic blur.
 */
export function GlowOrb({
  className = "",
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "blue" | "magenta" | "gold";
}) {
  const tone =
    color === "magenta"
      ? "bg-[#FF2CF0]/25"
      : color === "cyan"
        ? "bg-[#0CF1FF]/25"
        : "bg-[#3003D9]/20";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${tone} ${className}`}
      style={{
        clipPath:
          "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
      }}
    />
  );
}
