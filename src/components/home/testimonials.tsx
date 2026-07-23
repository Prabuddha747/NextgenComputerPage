"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/data/testimonials";
import { business } from "@/data/business";

const AVATAR_TINTS = ["bg-accent/20 text-accent", "bg-sale/20 text-sale", "bg-success/20 text-success"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <Section className="relative overflow-hidden bg-surface/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionHeading eyebrow="Reviews" title="What Patna says about us" />
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-display text-lg font-bold text-foreground">{business.rating}</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">{business.reviewCount.toLocaleString()}+</span> Google
              reviews
            </p>
          </div>
        </div>
        <div className="mb-1 flex gap-2">
          <button
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-accent/60"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-accent/60"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={track} className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-accent/40"
          >
            <Quote className="absolute -right-2 -top-2 h-20 w-20 text-foreground/[0.04]" strokeWidth={1} />
            <div className="relative flex text-accent">
              {Array.from({ length: Math.round(t.rating) }).map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="relative mt-3 text-sm leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}
              >
                {initials(t.name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted">{t.context}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
