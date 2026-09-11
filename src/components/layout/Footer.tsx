import { SITE_NAME, SITE_VERSION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neon-cyan/10 bg-void/80 py-8">
      <div className="mx-auto grid max-w-7xl items-center gap-3 px-4 text-center sm:grid-cols-[1fr_auto_1fr] sm:px-6 sm:text-left">
        <p className="font-mono text-[13.5pt] leading-[1.55] tracking-widest text-muted sm:justify-self-start">
          {SITE_NAME} · {SITE_VERSION}
        </p>
        <p className="font-mono text-[13.5pt] leading-[1.55] uppercase tracking-[0.3em] text-muted/70 sm:justify-self-end">
          Cryogenic Node
        </p>
      </div>
    </footer>
  );
}
