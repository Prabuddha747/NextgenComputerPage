"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { business } from "@/data/business";
import { heroSlides } from "@/data/hero-slides";
import { clsx } from "clsx";

const SLIDE_DURATION = 6500;

// Cheap cinematic depth layer: a handful of soft glow orbs drifting slowly.
// transform-only animation (see .float-particle in globals.css) so it's GPU
// composited and doesn't touch layout.
const PARTICLES = [
  { top: "15%", left: "12%", size: 6, color: "var(--accent)", duration: "10s", driftX: "18px", driftY: "-24px" },
  { top: "70%", left: "22%", size: 4, color: "#a78bfa", duration: "13s", driftX: "-14px", driftY: "16px" },
  { top: "30%", left: "78%", size: 5, color: "var(--accent)", duration: "11s", driftX: "-20px", driftY: "14px" },
  { top: "80%", left: "68%", size: 3, color: "#fbbf24", duration: "8s", driftX: "12px", driftY: "-16px" },
  { top: "50%", left: "50%", size: 4, color: "#a78bfa", duration: "14s", driftX: "-16px", driftY: "-20px" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 0.8, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.photo}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="float-particle absolute rounded-full blur-[2px]"
            style={
              {
                top: p.top,
                left: p.left,
                width: p.size * 4,
                height: p.size * 4,
                background: p.color,
                opacity: 0.5,
                boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
                "--drift-duration": p.duration,
                "--drift-x": p.driftX,
                "--drift-y": p.driftY,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative flex min-h-screen flex-col justify-center px-6 py-24 sm:px-14">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                {slide.eyebrow}
              </p>

              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {slide.headline}
              </h1>

              <p className="mt-6 max-w-md text-base text-white/80 sm:text-lg">{slide.copy}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href={slide.primary.href} size="lg">
                    {slide.primary.label}
                  </Button>
                </Magnetic>
                <Button href={slide.secondary.href} variant="onImage" size="lg">
                  {slide.secondary.label}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-2 text-sm text-white/80">
            <div className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">{business.rating}</span>
            <span>· {business.reviewCount.toLocaleString()}+ reviews</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={clsx(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
}
