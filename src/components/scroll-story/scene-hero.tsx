"use client";

import { Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";
import { heroContent } from "@/data/hero-content";

// Chapter one of the scroll-story — no photo of its own, just the headline
// floating over the shared build reel, which starts assembling right here.
export function SceneHero() {
  return (
    <PinnedScene heightVh={150}>
      {() => (
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              {heroContent.eyebrow}
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {heroContent.headline}
            </h1>

            <p className="mt-6 max-w-md text-base text-white/80 sm:text-lg">{heroContent.copy}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button href={heroContent.primary.href} size="lg">
                  {heroContent.primary.label}
                </Button>
              </Magnetic>
              <Button href={heroContent.secondary.href} variant="onImage" size="lg">
                {heroContent.secondary.label}
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-white/80">
              <div className="flex text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-white">{business.rating}</span>
              <span>· {business.reviewCount.toLocaleString()}+ reviews</span>
            </div>
          </motion.div>
        </Container>
      )}
    </PinnedScene>
  );
}
