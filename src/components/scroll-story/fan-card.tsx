"use client";

import { motion, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { getCardTransform } from "@/lib/fan-deck-math";
import { useFanDeckContext } from "@/components/scroll-story/fan-deck";

export function FanCard({
  index,
  count,
  maxAngle,
  spacing,
  enterOffset,
  className,
  children,
}: {
  index: number;
  count: number;
  /** Override the variant's default tilt/spread — e.g. commerce grids that must
   * settle nearly flat for legibility, unlike the owner/review decks. */
  maxAngle?: number;
  spacing?: number;
  /** Transient px kick this card enters from (negative = from the left, positive
   * = from the right) — decays to 0 at rest, unlike `spacing`'s permanent offset. */
  enterOffset?: number;
  className?: string;
  children: ReactNode;
}) {
  const { progress, variant } = useFanDeckContext();
  const reduceMotion = useReducedMotion();
  const overrides = { maxAngle, spacing, enterOffset };

  const x = useTransform(progress, (p) =>
    reduceMotion ? 0 : getCardTransform(p, index, count, variant, overrides).x
  );
  const y = useTransform(progress, (p) =>
    reduceMotion ? 0 : getCardTransform(p, index, count, variant, overrides).y
  );
  const rotate = useTransform(progress, (p) =>
    reduceMotion ? 0 : getCardTransform(p, index, count, variant, overrides).rotate
  );
  // Opacity always animates, even with reduced motion — spec keeps a flat fade
  // (~200ms feel) so the reveal stays legible without the translate/rotate.
  const opacity = useTransform(progress, (p) => getCardTransform(p, index, count, variant, overrides).opacity);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
