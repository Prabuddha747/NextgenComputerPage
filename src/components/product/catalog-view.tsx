"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { priceBands } from "@/lib/price-bands";
import { cn } from "@/lib/cn";

const categoryLinks = [
  { label: "Gaming PCs", href: "/gaming-pcs" },
  { label: "Laptops", href: "/laptops" },
  { label: "Accessories", href: "/accessories" },
];

export function CatalogView({
  products,
  activeCategory,
  initialBrand,
}: {
  products: Product[];
  activeCategory: string;
  initialBrand?: string;
}) {
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand && brands.includes(initialBrand) ? [initialBrand] : []
  );
  const [selectedBands, setSelectedBands] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (list: string[], value: string, setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = products.filter((p) => {
    const brandOk = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const bandOk =
      selectedBands.length === 0 ||
      priceBands.some((band) => selectedBands.includes(band.label) && band.test(p.price));
    return brandOk && bandOk;
  });

  const activeFilterCount = selectedBrands.length + selectedBands.length;

  const sidebarContent = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Categories</p>
        <ul className="space-y-1">
          {categoryLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "block rounded-lg px-2.5 py-1.5 -mx-2.5 text-sm font-medium",
                  link.href === activeCategory ? "text-accent" : "text-foreground/90 hover:text-accent"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {brands.length > 1 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Brand</p>
          <ul className="space-y-2.5">
            {brands.map((brand) => (
              <li key={brand}>
                <label className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggle(selectedBrands, brand, setSelectedBrands)}
                    className="h-4 w-4 rounded border-border accent-[var(--accent)]"
                  />
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Price range</p>
        <ul className="space-y-2.5">
          {priceBands.map((band) => (
            <li key={band.label}>
              <label className="flex items-center gap-2.5 text-sm text-foreground/90">
                <input
                  type="checkbox"
                  checked={selectedBands.includes(band.label)}
                  onChange={() => toggle(selectedBands, band.label, setSelectedBands)}
                  className="h-4 w-4 rounded border-border accent-[var(--accent)]"
                />
                {band.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">{sidebarContent}</aside>

      <div>
        <div className="mb-6 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <p className="hidden text-sm text-muted lg:block">{filtered.length} products</p>
        </div>

        <motion.div key={`${selectedBrands.join()}-${selectedBands.join()}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <ProductGrid products={filtered} />
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-xs overflow-y-auto bg-background p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
