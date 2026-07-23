"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { FanDeck } from "@/components/scroll-story/fan-deck";
import { FanCard } from "@/components/scroll-story/fan-card";
import { SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByCategory } from "@/data/products";
import { clsx } from "clsx";

const REEL_FRAME_COUNT = 147;
const reelFrameSrc = (i: number) => `/featured-builds-reel/frame-${String(i).padStart(4, "0")}.jpg`;

// Cinematic PC-assembly b-roll, scrubbed 1:1 against the same scroll progress that
// drives the fan-deck below it — the backdrop and the cards move on one timeline.
function BuildReelBackground({ progress }: { progress: MotionValue<number> }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || cancelled) return;
        cancelled = true;
        observer.disconnect();
        let loaded = 0;
        for (let i = 1; i <= REEL_FRAME_COUNT; i++) {
          const img = new Image();
          img.src = reelFrameSrc(i);
          img.onload = img.onerror = () => {
            loaded++;
            if (loaded === REEL_FRAME_COUNT) setReady(true);
          };
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(progress, "change", (p) => {
    if (!imgRef.current) return;
    const frame = Math.min(REEL_FRAME_COUNT, Math.max(1, Math.round(p * (REEL_FRAME_COUNT - 1)) + 1));
    imgRef.current.src = reelFrameSrc(frame);
  });

  return (
    <div ref={wrapperRef} className="absolute inset-0 -z-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively per scroll frame; next/image can't do that */}
      <img
        ref={imgRef}
        src={reelFrameSrc(1)}
        alt=""
        className={clsx("h-full w-full object-cover transition-opacity duration-700", ready ? "opacity-30" : "opacity-0")}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
    </div>
  );
}

export function SceneFeaturedBuilds() {
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <PinnedScene heightVh={160}>
      {(progress) => (
        <>
          <BuildReelBackground progress={progress} />
          <Container>
            <SectionHeading eyebrow="Ready to game" title="Featured builds" />
            <FanDeck progress={progress} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pcs.map((product, i) => (
                // Same fan physics as every other deck, but settles nearly flat —
                // commerce cards need to end up scannable, not mid-tilt.
                <FanCard key={product.slug} index={i} count={pcs.length} maxAngle={4} spacing={0}>
                  <ProductCard product={product} priority={i === 0} />
                </FanCard>
              ))}
            </FanDeck>
          </Container>
        </>
      )}
    </PinnedScene>
  );
}
