"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";
import { getProductsByCategory } from "@/data/products";

export function FeaturedPcs() {
  const pcs = getProductsByCategory("gaming-pc");

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Ready to game"
            title="Featured gaming PCs"
            description="Prebuilt and benchmarked in-store, or configure your own from scratch."
          />
          <Link
            href="/gaming-pcs"
            className="group mb-12 flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            View all gaming PCs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pcs.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
