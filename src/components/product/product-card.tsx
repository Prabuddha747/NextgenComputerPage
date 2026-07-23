"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductArt } from "@/components/product/product-art";
import { Badge } from "@/components/ui/badge";
import { AddToBasketButton } from "@/components/basket/add-to-basket-button";
import { formatINR } from "@/lib/format";
import { buildWhatsAppLink } from "@/data/business";
import { clsx } from "clsx";

// Tech Aurora category accents: gaming stays the site's cyan, laptops/business
// get a cool silver, accessories keep the amber "sale" tone.
const CATEGORY_ACCENT: Record<Product["category"], string> = {
  "gaming-pc": "var(--accent)",
  laptop: "var(--accent-business)",
  accessory: "var(--sale)",
};

export function ProductCard({
  product,
  priority = false,
  dark = false,
}: {
  product: Product;
  priority?: boolean;
  /** Use the darker scene glass instead of the default light one — for cards
   * floating directly over the homepage's build video, where the normal
   * near-white 3% tint left text unreadable against a bright frame. */
  dark?: boolean;
}) {
  const accent = CATEGORY_ACCENT[product.category];

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      style={{ "--card-accent": accent } as CSSProperties}
      className={clsx(
        "group relative flex flex-col overflow-hidden transition-shadow duration-700 hover:shadow-[0_0_0_1px_var(--card-accent),0_24px_90px_-20px_var(--card-accent)]",
        dark ? "glass-card-scene" : "glass-card"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--card-accent), transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <ProductArt
            product={product}
            className="aspect-[4/3] w-full transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06] group-hover:rotate-1"
            priority={priority}
          />
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
        <p className="text-xs font-medium uppercase tracking-wider text-muted">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-[var(--card-accent)]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>

        <ul className="mt-4 space-y-1 text-xs text-foreground/80">
          {product.specs.slice(0, 2).map((spec) => (
            <li key={spec.label} className="flex justify-between border-b border-border/60 py-1.5">
              <span className="text-muted">{spec.label}</span>
              <span className="font-mono font-medium">{spec.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-2xl font-bold text-foreground">
            {formatINR(product.price)}
          </p>
          <div className="flex items-center gap-2">
            <AddToBasketButton
              item={{ slug: product.slug, name: product.name, price: product.price }}
              className="h-9 w-9"
            />
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
      </div>
    </motion.div>
  );
}
