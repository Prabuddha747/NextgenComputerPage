import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { CatalogView } from "@/components/product/catalog-view";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Laptops",
  description:
    "Dell, HP, Lenovo, Asus, Acer, MSI and Apple laptops in Patna — student, business, and gaming laptops with in-store demo and after-sales support.",
};

export default async function LaptopsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; price?: string; sort?: string }>;
}) {
  const { brand, price, sort } = await searchParams;
  const laptops = getProductsByCategory("laptop");

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Laptops"
        title="Every major brand, one showroom"
        description="From a lightweight student laptop to a workstation-grade creator machine — every laptop here is demoed in-store before you buy, with genuine after-sales support behind it. Filter by brand or message us for a personalised recommendation."
      />
      <CatalogView
        products={laptops}
        activeCategory="/laptops"
        initialBrand={brand}
        initialBands={price}
        initialSort={sort}
      />
    </Section>
  );
}
