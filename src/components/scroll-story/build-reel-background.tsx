"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

const REEL_FRAME_COUNT = 147;
const reelFrameSrc = (i: number) => `/featured-builds-reel/frame-${String(i).padStart(4, "0")}.jpg`;

// Cinematic PC-assembly b-roll, scrubbed 1:1 against the scroll progress passed in:
// frame 1 (parts exploded mid-air) at progress 0, frame 147 (assembled case) at
// progress 1. Frame 1 renders immediately on mount — no gated/blank state — so the
// backdrop is visible the instant this scene enters view.
export function BuildReelBackground({ progress }: { progress: MotionValue<number> }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Warm the browser cache so mid-scroll scrubbing doesn't hit the network;
    // the current frame below renders immediately and isn't gated on this.
    for (let i = 1; i <= REEL_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = reelFrameSrc(i);
    }
  }, []);

  useMotionValueEvent(progress, "change", (p) => {
    if (!imgRef.current) return;
    const frame = Math.min(REEL_FRAME_COUNT, Math.max(1, Math.round(p * (REEL_FRAME_COUNT - 1)) + 1));
    imgRef.current.src = reelFrameSrc(frame);
  });

  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively per scroll frame; next/image can't do that */}
      <img ref={imgRef} src={reelFrameSrc(1)} alt="" className="h-full w-full object-cover" />
      {/* Vignette, not a flat cover — stays clear over the center (where the build
          assembles) and only darkens toward the edges, where the text panels sit. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, transparent 40%, rgba(10,10,12,0.55) 76%, rgba(10,10,12,0.92) 100%)",
        }}
      />
    </div>
  );
}
