"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductArt } from "@/components/product/product-art";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/format";
import { buildWhatsAppLink } from "@/data/business";

export function ProductCard({ product }: { product: Product }) {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--accent), transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative">
          <ProductArt product={product} className="aspect-[4/3] w-full" />
          {product.badges && product.badges.length > 0 && (
            <div className="absolute left-3 top-3 flex gap-1.5">
              {product.badges.map((badge) => (
                <Badge key={badge} kind={badge} />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>

        <ul className="mt-4 space-y-1 text-xs text-foreground/80">
          {product.specs.slice(0, 3).map((spec) => (
            <li key={spec.label} className="flex justify-between border-b border-border/60 py-1">
              <span className="text-muted">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold text-foreground">
            {formatINR(product.price)}
          </p>
          <a
            href={buildWhatsAppLink(`Hi, I'm interested in the ${product.name}. Could you share more details?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  );
}
