"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useFullscreen } from "@/hooks/useFullscreen";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import { MarketTicker } from "../web3/MarketTicker";

export function Navbar() {
  const pathname = usePathname();
  const { isFullscreen, isSupported, toggle } = useFullscreen();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 overflow-visible border-b-2 border-[#0CF1FF] bg-black">
      <div className="mx-auto flex min-h-11 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:min-h-12 sm:px-4">
        <Link
          href="/"
          className="max-w-[55%] bg-transparent font-sans text-[12px] uppercase leading-tight tracking-[0.04em] text-[#FF2CF0] [overflow-wrap:anywhere] [text-wrap:wrap] sm:text-[13px] lg:max-w-none lg:text-[14px]"
          aria-label="CyborgPunks Club home"
        >
          CYBORGPUNKS CLUB
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1.5 font-sans text-[10px] uppercase tracking-[0.08em] transition-colors [overflow-wrap:anywhere] xl:px-2.5 xl:text-[12px] ${
                  active
                    ? "text-neon-cyan"
                    : "text-muted hover:text-[#FF2CF0]"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-neon-cyan"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ConnectNodeButton />

          {isSupported && (
            <button
              type="button"
              onClick={toggle}
              className="hud-chip hidden !px-2 !py-1 md:inline-flex"
              aria-pressed={isFullscreen}
              title="Toggle immersive fullscreen"
            >
              {isFullscreen ? "Exit FS" : "FS"}
            </button>
          )}

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-neon-cyan lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="font-sans text-sm">{open ? "X" : "="}</span>
          </button>
        </div>
      </div>
      <div className="overflow-visible border-t border-[#FF2CF0]/40 bg-black px-2 py-1">
        <div className="relative z-40 mx-auto w-full max-w-7xl overflow-visible">
          <MarketTicker />
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-2 border-[#0CF1FF] bg-black lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-0.5 px-3 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 font-sans text-[11px] uppercase tracking-widest text-muted [overflow-wrap:anywhere] hover:text-[#FF2CF0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
