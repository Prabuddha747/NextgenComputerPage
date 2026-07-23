// Pure math for the fan-deck signature mechanic (design spec §5.1). Given a
// scene's overall scroll progress and a card's position in the deck, returns
// where that card should sit right now. No React, no DOM — testable in isolation
// and shared by every scene that uses <FanDeck>.

export interface FanCardTransform {
  x: number;
  y: number;
  rotate: number;
  opacity: number;
}

export type FanVariant = "mobile" | "tablet" | "desktop";

const VARIANT_CONFIG: Record<FanVariant, { maxAngle: number; spacing: number }> = {
  desktop: { maxAngle: 15, spacing: 100 },
  tablet: { maxAngle: 8, spacing: 60 }, // ~40% less arc/spread than desktop
  mobile: { maxAngle: 0, spacing: 0 }, // vertical fade+rise only, no arc
};

function restingAngle(index: number, count: number, maxAngle: number): number {
  if (count <= 1 || maxAngle === 0) return 0;
  const mid = (count - 1) / 2;
  const step = maxAngle / mid;
  return (index - mid) * step;
}

function restingSpread(index: number, count: number, spacing: number): number {
  if (spacing === 0) return 0;
  const mid = (count - 1) / 2;
  return (index - mid) * spacing;
}

// "Ease-out expo" — the same feel as cubic-bezier(0.16, 1, 0.3, 1): a confident,
// fast-then-settle curve, like a card being flicked into place.
function easeOutExpo(t: number): number {
  return t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * @param progress overall scene scroll progress, 0..1
 * @param index this card's position in the deck, 0-based
 * @param count total cards in the deck
 * @param variant responsive mode — mobile drops rotation/spread entirely
 */
export function getCardTransform(
  progress: number,
  index: number,
  count: number,
  variant: FanVariant = "desktop",
  overrides?: { maxAngle?: number; spacing?: number }
): FanCardTransform {
  const base = VARIANT_CONFIG[variant];
  const maxAngle = overrides?.maxAngle ?? base.maxAngle;
  const spacing = overrides?.spacing ?? base.spacing;

  // Staggered start: card i begins animating slightly after card i-1.
  const startOffset = index / (count + 2);
  const local = Math.min(1, Math.max(0, (progress - startOffset) / 0.4));
  const eased = easeOutExpo(local);

  const angle = restingAngle(index, count, maxAngle);
  const spread = restingSpread(index, count, spacing);

  const mobileRise = variant === "mobile" ? 24 : 40;

  return {
    // Cards start at a small inward offset (15% of their resting spread) and
    // travel outward to it — never start at 0 the same as every other card.
    x: spread * (0.15 + 0.85 * eased),
    y: mobileRise * (1 - eased),
    // Rotation settles into its resting angle rather than spinning past it.
    rotate: angle * (0.3 + 0.7 * eased),
    // Finishes fading in before the motion settles (first 60% of local progress).
    opacity: Math.min(1, local / 0.6),
  };
}
