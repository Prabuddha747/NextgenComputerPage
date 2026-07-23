"use client";

import { Quote, Star } from "lucide-react";
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

function Card({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  return (
    <figure className="relative w-[320px] shrink-0 overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm">
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
    </figure>
  );
}

export function Testimonials() {
  const row1 = [...testimonials, ...testimonials, ...testimonials];
  const row2 = [...testimonials].reverse();
  const row2Tripled = [...row2, ...row2, ...row2];

  return (
    <Section className="relative overflow-hidden bg-surface/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mb-12">
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

      <div className="group/marquee relative space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <div className="flex w-max gap-5 animate-marquee group-hover/marquee:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <Card key={`r1-${i}`} t={t} i={i} />
          ))}
        </div>
        <div className="flex w-max gap-5 animate-marquee-reverse group-hover/marquee:[animation-play-state:paused]">
          {row2Tripled.map((t, i) => (
            <Card key={`r2-${i}`} t={t} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
