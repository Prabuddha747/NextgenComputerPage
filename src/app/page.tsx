import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { WhatWeDo } from "@/components/home/what-we-do";
import { FeaturedPcs } from "@/components/home/featured-pcs";
import { AccessoriesShowcase } from "@/components/home/accessories-showcase";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { LocationCta } from "@/components/home/location-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatWeDo />
      <FeaturedPcs />
      <AccessoriesShowcase />
      <FounderSpotlight />
      <Testimonials />
      <Faq />
      <LocationCta />
    </>
  );
}
