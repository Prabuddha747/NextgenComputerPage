// The shared <SectionHeading> uses theme-token colors (foreground/muted), which
// is correct on normal page backgrounds but goes low-contrast here — every
// scroll-story scene sits directly over the (always-dark) build video, not the
// page's theme background, so headings need to stay legible in light mode too.
// Hardcoded white + a drop shadow, like <SceneHero> already does, instead of
// theme tokens that assume a themed background is actually behind them.
export function SceneHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
