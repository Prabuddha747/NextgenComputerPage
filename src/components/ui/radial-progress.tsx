"use client";

import { motion } from "framer-motion";

export function RadialProgress({ value, sublabel }: { value: number; sublabel?: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="12" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <p className="font-display text-4xl font-bold text-foreground sm:text-5xl">{value}%</p>
        {sublabel && <p className="mt-1 max-w-[10rem] text-xs text-muted">{sublabel}</p>}
      </div>
    </div>
  );
}
