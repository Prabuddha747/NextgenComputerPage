"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { gsap } from "@/lib/gsap";
import { business } from "@/data/business";

const FRAME_COUNT = 146;
const frameSrc = (i: number) => `/scroll-reel/frame-${String(i).padStart(4, "0")}.jpg`;
const services = business.services;

// Each service flies in from a different direction — the "from all directions" ask.
const DIRECTIONS = [
  { x: -280, y: 0 },
  { x: 0, y: -220 },
  { x: 280, y: 0 },
  { x: 0, y: 220 },
  { x: -220, y: -180 },
  { x: 220, y: 180 },
];

// ...and lands in a different corner each time, instead of always dead-center.
const POSITIONS = [
  "items-start justify-start pt-28 pl-6 sm:pl-16",
  "items-start justify-end pt-28 pr-6 sm:pr-16",
  "items-end justify-start pb-28 pl-6 sm:pl-16",
  "items-end justify-end pb-28 pr-6 sm:pr-16",
  "items-center justify-start pl-6 sm:pl-16",
  "items-center justify-end pr-6 sm:pr-16",
];

// Only fades out at the very end, right before the section releases into whatever
// follows — no entry effect, the reel is just there the moment you reach it.
const EXIT_WINDOW = 0.08;

export function ScrollReel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

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
          scrub: 1.5, // reel visibly lags the scrollbar
        },
        onUpdate: () => {
          const frame = Math.round(state.frame);
          if (imgRef.current) imgRef.current.src = frameSrc(frame);

          const progress = (frame - 1) / (FRAME_COUNT - 1);

          const index = Math.min(services.length - 1, Math.floor(progress * services.length));
          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }

          if (stageRef.current) {
            const exitFade = Math.min(1, (1 - progress) / EXIT_WINDOW);
            stageRef.current.style.opacity = String(exitFade);
          }
        },
      });
    },
    { scope: wrapperRef, dependencies: [ready] }
  );

  const dir = DIRECTIONS[activeIndex % DIRECTIONS.length];

  return (
    <div ref={wrapperRef} className="relative h-[520vh]">
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element -- src is swapped imperatively per scroll frame; next/image can't do that */}
        <img
          ref={imgRef}
          src={frameSrc(1)}
          alt="Next Gen Computer builds — laptop, assembly, and full setup"
          className={clsx("h-full w-full object-cover transition-opacity duration-500", !ready && "opacity-50")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
        {/* Constant vignette over the source footage's burned-in watermark corner */}
        <div className="absolute right-0 top-0 h-40 w-56 bg-gradient-to-bl from-black/80 to-transparent" />

        <div className={clsx("pointer-events-none absolute inset-0 flex", POSITIONS[activeIndex % POSITIONS.length])}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.85, rotate: activeIndex % 2 === 0 ? -6 : 6 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="max-w-lg rounded-lg border-2 border-accent/50 bg-black/60 px-7 py-6 text-left shadow-2xl backdrop-blur-sm sm:px-10 sm:py-8"
            >
              <p className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
                {services[activeIndex].title}
              </p>
              <p className="mt-3 max-w-sm text-sm text-white/70 sm:text-base">
                {services[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {!ready && (
          <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/60">Loading…</p>
        )}
      </div>
    </div>
  );
}
