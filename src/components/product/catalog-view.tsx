"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { priceBands } from "@/lib/price-bands";
import { clsx } from "clsx";

const categoryLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Gaming PCs", href: "/gaming-pcs" },
  { label: "Laptops", href: "/laptops" },
  { label: "Accessories", href: "/accessories" },
];

const CATEGORY_LABELS: Record<Product["category"], string> = {
  "gaming-pc": "Gaming PCs",
  laptop: "Laptops",
  accessory: "Accessories",
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function parseList(param?: string) {
  return param ? param.split("|").filter(Boolean) : [];
}

function parseIndexList(param?: string) {
  return parseList(param)
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n >= 0 && n < priceBands.length);
}

export function CatalogView({
  products,
  activeCategory,
  initialBrand,
  initialCategories,
  initialBands,
  initialSort,
  initialQuery,
  showSearchBar,
}: {
  products: Product[];
  activeCategory: string;
  initialBrand?: string;
  initialCategories?: string;
  initialBands?: string;
  initialSort?: string;
  initialQuery?: string;
  /** Renders a prominent full-width search bar above the filters/grid — used on
   * /shop and /laptops, where searching by name/brand is the more common path in. */
  showSearchBar?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
    parseList(initialBrand).filter((b) => brands.includes(b))
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    parseList(initialCategories).filter((c) => categories.includes(c as Product["category"]))
  );
  const [selectedBandIndexes, setSelectedBandIndexes] = useState<number[]>(() => parseIndexList(initialBands));
  const [sort, setSort] = useState<SortValue>(() =>
    SORT_OPTIONS.some((o) => o.value === initialSort) ? (initialSort as SortValue) : "featured"
  );
  const [query, setQuery] = useState(initialQuery ?? "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters are shareable/bookmarkable — every change replaces the URL query string
  // (no scroll, no history entry per click) alongside the local state that drives the grid.
  const syncUrl = (next: {
    brands: string[];
    categories: string[];
    bandIndexes: number[];
    sort: SortValue;
    query: string;
  }) => {
    const params = new URLSearchParams();
    if (next.brands.length) params.set("brand", next.brands.join("|"));
    if (next.categories.length) params.set("category", next.categories.join("|"));
    if (next.bandIndexes.length) params.set("price", next.bandIndexes.join("|"));
    if (next.sort !== "featured") params.set("sort", next.sort);
    if (next.query.trim()) params.set("q", next.query.trim());
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const toggleBrand = (value: string) => {
    const next = selectedBrands.includes(value) ? selectedBrands.filter((v) => v !== value) : [...selectedBrands, value];
    setSelectedBrands(next);
    syncUrl({ brands: next, categories: selectedCategories, bandIndexes: selectedBandIndexes, sort, query });
  };

  const toggleCategory = (value: string) => {
    const next = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value];
    setSelectedCategories(next);
    syncUrl({ brands: selectedBrands, categories: next, bandIndexes: selectedBandIndexes, sort, query });
  };

  const toggleBand = (index: number) => {
    const next = selectedBandIndexes.includes(index)
      ? selectedBandIndexes.filter((v) => v !== index)
      : [...selectedBandIndexes, index];
    setSelectedBandIndexes(next);
    syncUrl({ brands: selectedBrands, categories: selectedCategories, bandIndexes: next, sort, query });
  };

  const changeSort = (value: SortValue) => {
    setSort(value);
    syncUrl({ brands: selectedBrands, categories: selectedCategories, bandIndexes: selectedBandIndexes, sort: value, query });
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    syncUrl({ brands: selectedBrands, categories: selectedCategories, bandIndexes: selectedBandIndexes, sort, query: value });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => {
      const brandOk = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const categoryOk = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const bandOk =
        selectedBandIndexes.length === 0 || selectedBandIndexes.some((i) => priceBands[i].test(p.price));
      const queryOk =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      return brandOk && categoryOk && bandOk && queryOk;
    });

    if (sort === "price-asc") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...result].sort((a, b) => b.price - a.price);
    if (sort === "newest") {
      // "Newest" uses the real NEW badge rather than a fabricated release date —
      // NEW-tagged products float to the top, stable order preserved otherwise.
      return [...result].sort((a, b) => Number(b.badges?.includes("NEW")) - Number(a.badges?.includes("NEW")));
    }
    return result;
  }, [products, selectedBrands, selectedCategories, selectedBandIndexes, sort, query]);

  const activeFilterCount = selectedBrands.length + selectedCategories.length + selectedBandIndexes.length;

  const sidebarContent = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Categories</p>
        <ul className="space-y-1">
          {categoryLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={clsx(
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

      {categories.length > 1 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Category</p>
          <ul className="space-y-2.5">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 rounded border-border accent-[var(--accent)]"
                  />
                  {CATEGORY_LABELS[category]}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

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
                    onChange={() => toggleBrand(brand)}
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
          {priceBands.map((band, i) => (
            <li key={band.label}>
              <label className="flex items-center gap-2.5 text-sm text-foreground/90">
                <input
                  type="checkbox"
                  checked={selectedBandIndexes.includes(i)}
                  onChange={() => toggleBand(i)}
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
    <div>
      {showSearchBar && (
        <div className="relative mx-auto mb-8 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            placeholder="Search products by name or brand..."
            className="glass-card h-12 w-full rounded-xl pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/60"
          />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{sidebarContent}</aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <p className="hidden text-sm text-muted lg:block">{filtered.length} products</p>

            <label className="ml-auto flex items-center gap-2 text-sm text-muted">
              Sort by
              <select
                value={sort}
                onChange={(e) => changeSort(e.target.value as SortValue)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <motion.div
            key={`${selectedBrands.join()}-${selectedCategories.join()}-${selectedBandIndexes.join()}-${sort}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
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
    </div>
  );
}
