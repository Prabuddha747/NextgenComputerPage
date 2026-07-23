import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { CatalogView } from "@/components/product/catalog-view";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Gaming PCs",
  description:
    "Custom and prebuilt gaming PCs in Patna, benchmarked in-store with up to 3-year on-site warranty. Filter by brand and budget, or build your own from scratch.",
};

export default async function GamingPcsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; price?: string; sort?: string; q?: string }>;
}) {
  const { brand, price, sort, q } = await searchParams;
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <Section className="pt-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Gaming PCs"
          title="Prebuilt rigs, benchmarked in-store"
          description="Every system is assembled, stress-tested, and benchmarked at our Dak Bunglow Road workshop before it reaches you — not shipped sealed from a warehouse. Filter by brand and budget below, or configure your own build from scratch."
        />
        <Link
          href="/configurator"
          className="group mb-12 flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          Build your own
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <CatalogView
        products={pcs}
        activeCategory="/gaming-pcs"
        initialBrand={brand}
        initialBands={price}
        initialSort={sort}
        initialQuery={q}
        showSearchBar
      />
    </Section>
  );
}
