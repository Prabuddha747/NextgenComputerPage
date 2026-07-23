"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { BuildReelBackground } from "@/components/scroll-story/build-reel-background";
import { SceneOwner } from "@/components/scroll-story/scene-owner";
import { SceneFeaturedBuilds } from "@/components/scroll-story/scene-featured-builds";

// "Behind the Counter" and "Featured Builds" share one continuous scroll-scrubbed
// backdrop instead of two disconnected clips: the PC assembles frame-by-frame
// across BOTH scenes combined, so scrolling through the founder's intro and into
// the product grid reads as one unbroken build sequence. `isolate` pins the
// z-index comparisons for the background/content layers to this wrapper only, so
// the video can't get buried under the page's own fixed atmosphere background.
export function StoryReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative isolate">
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <BuildReelBackground progress={scrollYProgress} />
      </div>
      <div className="relative z-10 -mt-[100vh]">
        <SceneOwner />
        <SceneFeaturedBuilds />
      </div>
    </div>
  );
}
