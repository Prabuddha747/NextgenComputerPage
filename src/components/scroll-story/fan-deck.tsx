"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MotionValue } from "framer-motion";
import type { FanVariant } from "@/lib/fan-deck-math";

interface FanDeckContextValue {
  progress: MotionValue<number>;
  variant: FanVariant;
}

const FanDeckContext = createContext<FanDeckContextValue | null>(null);

export function useFanDeckContext() {
  const ctx = useContext(FanDeckContext);
  if (!ctx) throw new Error("FanCard must be rendered inside a <FanDeck>");
  return ctx;
}

function useViewportVariant(): FanVariant {
  const [variant, setVariant] = useState<FanVariant>("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setVariant(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    queueMicrotask(compute); // deferred: same shape the set-state-in-effect rule wants
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return variant;
}

/**
 * Content-agnostic host for the fan-deck mechanic (design spec §5). Owns the
 * responsive variant (desktop/tablet/mobile) and passes scroll progress down
 * via context so individual <FanCard>s don't need it prop-drilled.
 */
export function FanDeck({
  progress,
  className,
  children,
}: {
  progress: MotionValue<number>;
  className?: string;
  children: ReactNode;
}) {
  const variant = useViewportVariant();

  return (
    <FanDeckContext.Provider value={{ progress, variant }}>
      <div className={className}>{children}</div>
    </FanDeckContext.Provider>
  );
}
