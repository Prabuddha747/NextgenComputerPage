import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductGrid } from "@/components/product/product-grid";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "RGB keyboards, mice, monitors, and CPU coolers — accessories to complete your gaming or work setup.",
};

export default function AccessoriesPage() {
  const accessories = getProductsByCategory("accessory");

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Accessories"
        title="Complete the setup"
        description="Keyboards, mice, monitors, and cooling — the finishing touches for any build."
      />
      <ProductGrid products={accessories} />
    </Section>
  );
}
