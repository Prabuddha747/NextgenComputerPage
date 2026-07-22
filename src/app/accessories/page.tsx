import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { CatalogView } from "@/components/product/catalog-view";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "RGB keyboards, mice, monitors, CPU coolers, and gaming chairs — accessories to complete your gaming or work setup.",
};

export default function AccessoriesPage() {
  const accessories = getProductsByCategory("accessory");

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Accessories"
        title="Complete the setup"
        description="Keyboards, mice, monitors, cooling, and seating — the finishing touches for any build, all available to see and try in-store."
      />
      <CatalogView products={accessories} activeCategory="/accessories" />
    </Section>
  );
}
