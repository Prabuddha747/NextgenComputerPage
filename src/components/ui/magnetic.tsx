"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/lib/use-magnetic";

export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  return (
    <motion.div
      ref={ref as never}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
