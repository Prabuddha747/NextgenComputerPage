"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { clsx } from "clsx";
import { gsap } from "@/lib/gsap";
import { business } from "@/data/business";

const FRAME_COUNT = 146;
const frameSrc = (i: number) => `/scroll-reel/frame-${String(i).padStart(4, "0")}.jpg`;

// One label per "What We Do" service, evenly spaced across the reel. Doubles as
// the on-screen badge that covers the watermark baked into the source footage.
const captions = business.services.map((service, i) => ({
  at: i / business.services.length,
  text: service.title,
}));

export function ScrollReel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
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
          trigger: wrapperRef.current,
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
    { scope: wrapperRef, dependencies: [ready] }
  );

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-24 h-[440px] overflow-hidden rounded-3xl border border-border bg-black sm:h-[500px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively per scroll frame; next/image can't do that */}
        <img
          ref={imgRef}
          src={frameSrc(1)}
          alt="Next Gen Computer builds — laptop, assembly, and full setup"
          className={clsx("h-full w-full object-cover transition-opacity duration-500", !ready && "opacity-50")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        <div className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-xs shadow-lg backdrop-blur sm:right-6 sm:top-6">
          <p ref={captionRef} className="font-medium text-white">
            {captions[0].text}
          </p>
        </div>

        {!ready && (
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60">Loading…</p>
        )}
      </div>
    </div>
  );
}
