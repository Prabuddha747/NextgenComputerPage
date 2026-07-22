"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// Subtle pointer-follow for a small number of primary CTAs — not applied broadly.
export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 });

  const onMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
