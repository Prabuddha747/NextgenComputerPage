"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { MessageCircle } from "lucide-react";
import { gsap, ensureGsapPlugins } from "@/lib/gsap";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductArt } from "@/components/product/product-art";
import { getProductsByCategory } from "@/data/products";
import { formatINR } from "@/lib/format";
import { buildWhatsAppLink } from "@/data/business";

const tilts = [-6, -3, 2, -2, 4, -4, 3];

export function AccessoriesShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const accessories = getProductsByCategory("accessory");

  useGSAP(
    () => {
      ensureGsapPlugins();
      gsap.fromTo(
        ".accessory-card",
        { opacity: 0, y: 60, rotate: (i: number) => tilts[i % tilts.length] * 2.2 },
        {
          opacity: 1,
          y: 0,
          rotate: (i: number) => tilts[i % tilts.length],
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <Section className="bg-surface/40">
      <div ref={root}>
        <SectionHeading
          eyebrow="Level up the desk"
          title="RGB gear & accessories"
          description="Keyboards, mice, cooling and monitors — scroll sideways to browse the shelf."
        />
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8">
          {accessories.map((product, i) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              style={{ rotate: `${tilts[i % tilts.length]}deg` }}
              className="accessory-card group relative w-64 shrink-0 snap-center rounded-3xl border border-border bg-background shadow-xl transition-transform duration-300 hover:!rotate-0 hover:scale-[1.03] sm:w-72"
            >
              <ProductArt product={product} className="aspect-[3/4] w-full rounded-3xl" />
              <div className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
                <p className="text-sm font-semibold text-white">{product.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-white/70">{formatINR(product.price)}</span>
                  <a
                    href={buildWhatsAppLink(`Hi, I'm interested in the ${product.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
