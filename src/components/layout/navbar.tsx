"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useBasket } from "@/components/basket/basket-context";
import { BasketPanel } from "@/components/basket/basket-panel";
import { Button } from "@/components/ui/button";
import { business, buildWhatsAppLink } from "@/data/business";
import { clsx } from "clsx";

const SHOP_ROUTES = ["/shop", "/gaming-pcs", "/laptops", "/accessories", "/configurator", "/product"];

export function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { items } = useBasket();
  const pathname = usePathname();
  const router = useRouter();
  const shopActive = SHOP_ROUTES.some((route) => pathname.startsWith(route));

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setSearchValue("");
  };

  return (
    <>
      <div className="hidden bg-accent px-4 py-2 text-center text-xs font-medium text-accent-foreground sm:block">
        {business.yearsExperience}+ years in Patna · {business.rating}★ from {business.reviewCount.toLocaleString()}+ reviews
      </div>

      {/* Same glass-blurred bar on every page, always — it used to switch to a
          flat bg-background before the user scrolled 12px, which read as an
          inconsistent navbar depending on how tall/short the page was. */}
      <header
        onMouseLeave={() => setShopOpen(false)}
        className="sticky top-0 z-30 relative w-full border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-18 max-w-[1680px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-foreground">
            Next<span className="text-accent">Gen</span> Computer
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/shop"
              onMouseEnter={() => setShopOpen(true)}
              className={clsx(
                "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                shopOpen || shopActive ? "text-accent" : "text-foreground/90 hover:text-accent"
              )}
              aria-expanded={shopOpen}
              aria-current={shopActive ? "page" : undefined}
            >
              Shop
              <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", shopOpen && "rotate-180")} />
              {shopActive && (
                <motion.span
                  layoutId="navbar-active-underline"
                  className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-accent"
                />
              )}
            </Link>

            {primaryNav.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setShopOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-accent" : "text-foreground/90 hover:text-accent"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-accent/60"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <button
              aria-label="Open enquiry basket"
              onClick={() => setBasketOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-accent/60"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {items.length}
                </span>
              )}
            </button>
            <ThemeToggle />
            <Button
              href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
              size="md"
              className="hidden md:inline-flex"
            >
              WhatsApp Us
            </Button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>{shopOpen && <MegaMenu />}</AnimatePresence>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-[var(--glass-border)]"
            >
              <form onSubmit={submitSearch} className="mx-auto flex max-w-[1680px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-10">
                <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
                <input
                  autoFocus
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search gaming PCs, laptops, accessories..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <BasketPanel open={basketOpen} onClose={() => setBasketOpen(false)} />
    </>
  );
}
