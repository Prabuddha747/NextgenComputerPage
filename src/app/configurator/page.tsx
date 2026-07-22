import type { Metadata } from "next";
import { Cpu } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductArt } from "@/components/product/product-art";
import { SpecSelector } from "@/components/product/spec-selector";
import { getProductBySlug } from "@/data/products";

export const metadata: Metadata = {
  title: "PC Configurator",
  description:
    "Build your own gaming PC — pick your processor, graphics card, memory, storage, and cooling, then get an instant quote on WhatsApp.",
};

export default function ConfiguratorPage() {
  const base = getProductBySlug("vengeance-i7-strike")!;

  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Build your own"
        title="Configure your elite system"
        description="Start from our flagship build and tune it to your budget — every combination is quoted instantly."
      />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductArt product={base} className="aspect-square w-full" />
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Cpu className="h-4 w-4 text-accent" />
            Base build: {base.name}
          </div>
        </div>
        <SpecSelector product={base} groups={base.configurable ?? []} />
      </div>
    </Section>
  );
}
