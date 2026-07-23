"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Shared "jump in" scroll reveal — a spring overshoot rather than a flat fade,
// so cards feel like they land rather than just appear. `index` staggers a
// row/grid of these so they arrive one at a time instead of all at once.
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 18, delay: index * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
