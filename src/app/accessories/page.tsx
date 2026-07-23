import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { CatalogView } from "@/components/product/catalog-view";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "RGB keyboards, mice, monitors, CPU coolers, and gaming chairs — accessories to complete your gaming or work setup.",
};

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; price?: string; sort?: string; q?: string }>;
}) {
  const { brand, price, sort, q } = await searchParams;
  const accessories = getProductsByCategory("accessory");

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Accessories"
        title="Complete the setup"
        description="Keyboards, mice, monitors, cooling, and seating — the finishing touches for any build, all available to see and try in-store."
      />
      <CatalogView
        products={accessories}
        activeCategory="/accessories"
        initialBrand={brand}
        initialBands={price}
        initialSort={sort}
        initialQuery={q}
        showSearchBar
      />
    </Section>
  );
}
