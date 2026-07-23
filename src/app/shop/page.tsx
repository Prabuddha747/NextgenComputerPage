import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { CatalogView } from "@/components/product/catalog-view";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Every gaming PC, laptop, and accessory we sell in Patna — filter by category, brand, or budget in one place.",
};

export default async function ShopAllPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Shop"
        title="Everything we sell, in one place"
        description="Gaming PCs, laptops, and accessories — filter by category, brand, or budget to find what you need."
      />
      <CatalogView products={products} activeCategory="/shop" initialBrand={brand} />
    </Section>
  );
}
