"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const { items } = useBasket();
  const pathname = usePathname();
  const shopActive = SHOP_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden bg-accent px-4 py-2 text-center text-xs font-medium text-accent-foreground sm:block">
        {business.yearsExperience}+ years in Patna · {business.rating}★ from {business.reviewCount.toLocaleString()}+ reviews
      </div>

      <header
        onMouseLeave={() => setShopOpen(false)}
        className={clsx(
          "sticky top-0 z-30 w-full border-b transition-colors duration-500 relative",
          scrolled
            ? "border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl"
            : "border-transparent bg-background"
        )}
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
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <BasketPanel open={basketOpen} onClose={() => setBasketOpen(false)} />
    </>
  );
}
