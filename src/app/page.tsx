import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { ServicesGrid } from "@/components/home/services-grid";
import { FeaturedPcs } from "@/components/home/featured-pcs";
import { AccessoriesShowcase } from "@/components/home/accessories-showcase";
import { RepairProcess } from "@/components/home/repair-process";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { LocationCta } from "@/components/home/location-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeaturedPcs />
      <AccessoriesShowcase />
      <RepairProcess />
      <Testimonials />
      <Faq />
      <LocationCta />
    </>
  );
}
