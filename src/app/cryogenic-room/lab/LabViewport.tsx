"use client";

import { useEffect } from "react";

const LAB_HOME = "https://www.cyborgpunks.xyz/";

/**
 * Full-bleed xyz HOME under Club navbar+ticker. No second chrome row.
 */
export function LabViewport() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 top-[4.75rem] z-10 overflow-hidden bg-black">
      <iframe
        title="CyborgPunks Cryogenic Generation Lab"
        src={LAB_HOME}
        allow="fullscreen; clipboard-read; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-full w-full border-0 bg-black"
      />
    </div>
  );
}
