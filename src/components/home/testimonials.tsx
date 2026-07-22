"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/data/testimonials";
import { business } from "@/data/business";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    track.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <Section>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Reviews"
          title="What Patna says about us"
          description={`${business.rating}★ average across ${business.reviewCount.toLocaleString()}+ Google reviews.`}
        />
        <div className="mb-12 flex gap-2">
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

      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="w-[320px] shrink-0 snap-start rounded-2xl border border-border bg-surface p-6"
          >
            <Quote className="mb-3 h-6 w-6 text-accent/60" />
            <blockquote className="text-sm text-foreground/90">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted">{t.context}</p>
              </div>
              <div className="flex text-accent">
                {Array.from({ length: Math.round(t.rating) }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
