"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PIXEL_COLORS = [
  "rgba(12, 241, 255, ", // #0CF1FF
  "rgba(219, 63, 253, ", // #DB3FFD
  "rgba(255, 200, 37, ", // #FFC825
] as const;

/**
 * Pixel particle field — neon squares drifting upward.
 * Pauses entirely when prefers-reduced-motion is on.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    type Particle = {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      drift: number;
      color: (typeof PIXEL_COLORS)[number];
    };

    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      const count = window.innerWidth < 768 ? 28 : 48;
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const spawn = (randomY = false): Particle => ({
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 4,
      size: Math.random() < 0.5 ? 2 : Math.random() < 0.7 ? 3 : 4,
      speed: Math.random() * 0.35 + 0.12,
      alpha: Math.random() * 0.28 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      color: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
    });

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -8) Object.assign(p, spawn(false));

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
