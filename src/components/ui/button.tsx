"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { clsx } from "clsx";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "onImage";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "btn-sweep bg-gradient-to-br from-accent to-accent/75 text-accent-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_-8px_var(--accent)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_36px_-6px_var(--accent)]",
  secondary:
    "border border-[var(--glass-border)] bg-[var(--glass-bg)] text-foreground backdrop-blur-md hover:border-accent/60 hover:shadow-[0_0_28px_-6px_var(--accent)]",
  onImage: "border border-white/25 bg-white/10 text-white backdrop-blur hover:border-accent/60",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-shadow duration-700 ease-[cubic-bezier(.19,1,.22,1)]",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
          {...motionProps}
        >
          {icon}
          {children}
        </motion.a>
      );
    }
    return (
      <MotionLink href={href} className={classes} {...motionProps}>
        {icon}
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {icon}
      {children}
    </motion.button>
  );
}
