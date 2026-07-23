"use client";

import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { FanDeck } from "@/components/scroll-story/fan-deck";
import { FanCard } from "@/components/scroll-story/fan-card";
import { SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByCategory } from "@/data/products";

export function SceneFeaturedBuilds() {
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <PinnedScene heightVh={140}>
      {(progress) => (
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
      )}
    </PinnedScene>
  );
}
