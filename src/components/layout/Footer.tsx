export function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-[#0CF1FF] bg-black py-3">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-3 sm:flex-row sm:px-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#FF2CF0]">
          NODE STATUS
        </p>
        <span className="circuit-crosshair relative h-3 w-3" aria-hidden />
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-neon-cyan">
          {"//"} ONLINE
        </p>
      </div>
    </footer>
  );
}
