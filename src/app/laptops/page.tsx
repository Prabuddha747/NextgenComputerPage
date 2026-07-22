import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { LaptopCatalog } from "@/components/product/laptop-catalog";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Laptops",
  description:
    "Dell, HP, Lenovo, Asus, Acer, MSI and Apple laptops in Patna — student, business, and gaming laptops with in-store demo and after-sales support.",
};

export default async function LaptopsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  const laptops = getProductsByCategory("laptop");

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Laptops"
        title="Every major brand, one showroom"
        description="Student, business, and gaming laptops — filter by brand or message us for a personalised recommendation."
      />
      <LaptopCatalog products={laptops} initialBrand={brand} />
    </Section>
  );
}
