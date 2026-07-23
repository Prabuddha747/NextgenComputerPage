"use client";

import { PinnedScene } from "@/components/scroll-story/pinned-scene";
import { FanDeck } from "@/components/scroll-story/fan-deck";
import { FanCard } from "@/components/scroll-story/fan-card";
import { SceneHeading } from "@/components/scroll-story/scene-heading";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByCategory } from "@/data/products";

export function SceneFeaturedBuilds() {
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <PinnedScene heightVh={140}>
      {(progress) => (
        <Container>
          <SceneHeading
            eyebrow="Ready to game"
            title="Every build, benchmarked before it's yours"
            description="No sealed boxes shipped from a warehouse — assembled and stress-tested at our Dak Bunglow Road workshop first."
          />
          <FanDeck progress={progress} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pcs.map((product, i) => (
              // Same fan physics as every other deck, but settles nearly flat —
              // commerce cards need to end up scannable, not mid-tilt.
              <FanCard key={product.slug} index={i} count={pcs.length} maxAngle={4} spacing={0}>
                <ProductCard product={product} priority={i === 0} dark />
              </FanCard>
            ))}
          </FanDeck>
        </Container>
      )}
    </PinnedScene>
  );
}
