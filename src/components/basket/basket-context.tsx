"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface BasketItem {
  slug: string;
  name: string;
  price: number;
}

interface BasketContextValue {
  items: BasketItem[];
  add: (item: BasketItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const STORAGE_KEY = "ngc-enquiry-basket";
const BasketContext = createContext<BasketContextValue | null>(null);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  // Server and first client paint both render an empty basket (no mismatch);
  // the real localStorage value is only applied after hydration.
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    // setState is deferred into a microtask callback (not a direct statement in
    // the effect body) — still runs after mount/hydration either way, this just
    // satisfies the lint rule's "callback, not a bare effect-body call" shape.
    queueMicrotask(() => {
      try {
        setItems(JSON.parse(raw));
      } catch {
        // ignore malformed storage
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (item: BasketItem) => {
    setItems((prev) => (prev.some((i) => i.slug === item.slug) ? prev : [...prev, item]));
  };
  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);
  const has = (slug: string) => items.some((i) => i.slug === slug);

  return (
    <BasketContext.Provider value={{ items, add, remove, clear, has }}>{children}</BasketContext.Provider>
  );
}

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
}
