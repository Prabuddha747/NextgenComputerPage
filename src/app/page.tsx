import { Hero } from "@/components/home/hero";
import { StoryReel } from "@/components/scroll-story/story-reel";
import { SceneReviews } from "@/components/scroll-story/scene-reviews";
import { SceneVisitUs } from "@/components/scroll-story/scene-visit-us";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryReel />
      <SceneReviews />
      <SceneVisitUs />
    </>
  );
}
