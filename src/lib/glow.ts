// Shared bottom-up radial glow used by the Services hero photo and each
// ServiceVisual card — same formula, just a different tint per call site.
export function glowOverlayStyle(color: string) {
  return { background: `radial-gradient(60% 100% at 50% 100%, ${color}, transparent 70%)` };
}
