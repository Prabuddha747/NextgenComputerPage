import { Hero } from "@/components/home/hero";
import { SceneOwner } from "@/components/scroll-story/scene-owner";
import { SceneFeaturedBuilds } from "@/components/scroll-story/scene-featured-builds";
import { SceneReviews } from "@/components/scroll-story/scene-reviews";
import { SceneVisitUs } from "@/components/scroll-story/scene-visit-us";

export default function Home() {
  return (
    <>
      <Hero />
      <SceneOwner />
      <SceneFeaturedBuilds />
      <SceneReviews />
      <SceneVisitUs />
    </>
  );
}
