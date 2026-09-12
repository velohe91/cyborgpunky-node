"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "outline";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const variantClass: Record<Variant, string> = {
  solid: "hud-chip",
  outline: "hud-chip hud-chip-outline",
  ghost: "hud-chip hud-chip-outline",
};

/**
 * HUD octagon chip — Press Start 2P, split magenta/cyan energy.
 */
export function NeonButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: Props) {
  const classes = `${variantClass[variant]} ${className}`;

  const motionProps = {
    whileHover: { y: -1 },
    whileTap: { y: 1 },
    transition: { duration: 0.12 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
