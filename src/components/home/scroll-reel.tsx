"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { clsx } from "clsx";
import { gsap } from "@/lib/gsap";

const FRAME_COUNT = 146;
const frameSrc = (i: number) => `/scroll-reel/frame-${String(i).padStart(4, "0")}.jpg`;

// Roughly one per source clip in the reel: laptop → build/assembly → detail → full ecosystem.
// Doubles as the on-screen badge that covers the watermark baked into the source footage.
const captions = [
  { at: 0, text: "Every laptop, ready to work" },
  { at: 0.26, text: "Built and assembled in-store" },
  { at: 0.51, text: "Precision fit, every time" },
  { at: 0.76, text: "Your whole setup, one shop" },
];

export function ScrollReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || cancelled) return;
        cancelled = true;
        observer.disconnect();
        let loaded = 0;
        for (let i = 1; i <= FRAME_COUNT; i++) {
          const img = new Image();
          img.src = frameSrc(i);
          img.onload = img.onerror = () => {
            loaded++;
            if (loaded === FRAME_COUNT) setReady(true);
          };
        }
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const state = { frame: 1 };
      gsap.to(state, {
        frame: FRAME_COUNT,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => {
          const frame = Math.round(state.frame);
          if (imgRef.current) imgRef.current.src = frameSrc(frame);
          const progress = (frame - 1) / (FRAME_COUNT - 1);
          const current = [...captions].reverse().find((c) => progress >= c.at);
          if (captionRef.current && current) captionRef.current.textContent = current.text;
        },
      });
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively per scroll frame; next/image can't do that */}
        <img
          ref={imgRef}
          src={frameSrc(1)}
          alt="Next Gen Computer builds — laptop, assembly, and full setup"
          className={clsx("h-full w-full object-cover transition-opacity duration-500", !ready && "opacity-50")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        <div className="absolute right-6 top-6 rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-xs shadow-lg backdrop-blur sm:right-10 sm:top-10">
          <p ref={captionRef} className="font-medium text-white">
            {captions[0].text}
          </p>
        </div>

        {!ready && (
          <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/60">Loading…</p>
        )}
      </div>
    </section>
  );
}
