"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { cn } from "@/lib/cn";

export function LaptopCatalog({
  products,
  initialBrand,
}: {
  products: Product[];
  initialBrand?: string;
}) {
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );
  const [active, setActive] = useState<string | null>(
    initialBrand && brands.includes(initialBrand) ? initialBrand : null
  );

  const filtered = active ? products.filter((p) => p.brand === active) : products;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterPill label="All Brands" isActive={active === null} onClick={() => setActive(null)} />
        {brands.map((brand) => (
          <FilterPill
            key={brand}
            label={brand}
            isActive={active === brand}
            onClick={() => setActive(brand)}
          />
        ))}
      </div>
      <motion.div key={active ?? "all"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <ProductGrid products={filtered} />
      </motion.div>
    </div>
  );
}

function FilterPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-accent bg-accent/15 text-accent"
          : "border-border text-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
