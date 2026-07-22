import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductGrid } from "@/components/product/product-grid";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Gaming PCs",
  description:
    "Custom and prebuilt gaming PCs in Patna, benchmarked in-store with up to 3-year on-site warranty.",
};

export default function GamingPcsPage() {
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <Section className="pt-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Gaming PCs"
          title="Prebuilt rigs, benchmarked in-store"
          description="Or configure your own from scratch and get a quote on WhatsApp."
        />
        <Link
          href="/configurator"
          className="group mb-12 flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          Build your own
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ProductGrid products={pcs} />
    </Section>
  );
}
