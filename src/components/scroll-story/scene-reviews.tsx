"use client";

import { Quote, Star } from "lucide-react";
import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { FanDeck } from "@/components/scroll-story/fan-deck";
import { FanCard } from "@/components/scroll-story/fan-card";
import { SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";
import { business } from "@/data/business";

const AVATAR_TINTS = ["bg-accent/20 text-accent", "bg-sale/20 text-sale", "bg-success/20 text-success"];

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export function SceneReviews() {
  return (
    <PinnedScene heightVh={140}>
      {(progress) => (
        <Container>
          <SectionHeading
            eyebrow="Reviews"
            title="What Patna says about us"
            description={`${business.rating}★ average across ${business.reviewCount.toLocaleString()}+ Google reviews.`}
          />
          {/* A real two-column grid, not CSS-column masonry — masonry's auto-balance
              interacted badly with this scene's fixed-height sticky container and
              left almost everything piling into column one. Row-major grid flow
              also gives us the mirror for free: even index left, odd index right,
              which lines up exactly with the left/right entrance direction below. */}
          <FanDeck progress={progress} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <FanCard
                key={t.name}
                index={i}
                count={testimonials.length}
                maxAngle={5}
                spacing={0}
                enterOffset={i % 2 === 0 ? -140 : 140}
                className="glass-card relative p-6"
              >
                <Quote className="absolute -right-2 -top-2 h-16 w-16 text-foreground/[0.04]" strokeWidth={1} />
                <div className="relative flex text-accent">
                  {Array.from({ length: Math.round(t.rating) }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="relative mt-3 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}
                  >
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.context}</p>
                  </div>
                </div>
              </FanCard>
            ))}
          </FanDeck>
        </Container>
      )}
    </PinnedScene>
  );
}
