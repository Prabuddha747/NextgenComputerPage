"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";
import { clsx } from "clsx";

/**
 * Shared pin structure for scroll-story scenes (design spec §5.2): a tall outer
 * wrapper provides scroll distance, a CSS-sticky inner div holds the visible
 * content — cheaper than JS-driven fixed positioning, and it can't fight the
 * navbar's own stacking context the way a `position: fixed` hero can.
 */
export function PinnedScene({
  heightVh = 180,
  className,
  children,
}: {
  heightVh?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} style={{ height: `${heightVh}vh` }} className="relative">
      <div className={clsx("sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden", className)}>
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
