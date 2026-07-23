"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { shopMegaMenu } from "@/data/nav";
import { productIcons, ProductArt } from "@/components/product/product-art";
import { products } from "@/data/products";

const featured = products.find((p) => p.slug === "vengeance-i7-strike")!;

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute inset-x-0 top-full z-30 border-b border-border bg-surface shadow-2xl"
    >
      <div className="mx-auto grid max-w-[1680px] grid-cols-3 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-10">
        {shopMegaMenu.map((column) => {
          const Icon = productIcons[column.icon];
          return (
            <div key={column.title}>
              <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-xl border border-border">
                <Image src={column.photo} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group/link flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted/60 group-hover/link:text-foreground" strokeWidth={1.5} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <Link href={`/product/${featured.slug}`} onClick={onNavigate} className="group block">
          <ProductArt product={featured} className="aspect-square w-full" />
          <p className="mt-3 flex items-center gap-1 text-sm font-medium text-foreground">
            Explore the Configurator
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
