"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { shopMegaMenu } from "@/data/nav";
import { productIcons } from "@/components/product/product-art";
import { products } from "@/data/products";
import { ProductArt } from "@/components/product/product-art";

const featured = products.find((p) => p.slug === "vengeance-i7-strike")!;

export function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-1/2 top-full z-30 mt-3 w-[min(920px,90vw)] -translate-x-1/2 rounded-3xl border border-border bg-surface p-6 shadow-2xl"
    >
      <div className="grid grid-cols-4 gap-8">
        {shopMegaMenu.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {column.title}
            </p>
            <ul className="space-y-2">
              {column.links.map((link) => {
                const Icon = productIcons[link.icon];
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 -mx-2 text-sm text-foreground/90 transition-colors hover:bg-surface-2 hover:text-accent"
                    >
                      <Icon className="h-4 w-4 text-muted group-hover:text-accent" strokeWidth={1.5} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <Link href={`/product/${featured.slug}`} className="group block">
          <ProductArt product={featured} className="aspect-square w-full" />
          <p className="mt-3 flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent">
            Explore the Configurator
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
