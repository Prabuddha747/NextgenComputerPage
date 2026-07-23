"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { BuildReelBackground } from "@/components/scroll-story/build-reel-background";
import { SceneHero } from "@/components/scroll-story/scene-hero";
import { SceneOwner } from "@/components/scroll-story/scene-owner";
import { SceneFeaturedBuilds } from "@/components/scroll-story/scene-featured-builds";
import { SceneReviews } from "@/components/scroll-story/scene-reviews";
import { SceneVisitUs } from "@/components/scroll-story/scene-visit-us";

// The whole homepage — Hero, Behind the Counter, Featured Builds, Reviews, and
// Visit Us — shares one continuous scroll-scrubbed backdrop instead of separate
// clips or a static hero photo: the PC assembles frame-by-frame across all five
// chapters combined, so nothing (including the location section) sits apart from
// the story as a disconnected static block. `isolate` pins the z-index
// comparisons for the background/content layers to this wrapper only, so the
// video can't get buried under the page's own fixed atmosphere background.
export function StoryReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative isolate">
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <BuildReelBackground progress={scrollYProgress} />
      </div>
      <div className="relative z-10 -mt-[100vh]">
        <SceneHero />
        <SceneOwner />
        <SceneFeaturedBuilds />
        <SceneReviews />
        <SceneVisitUs />
      </div>
    </div>
  );
}
