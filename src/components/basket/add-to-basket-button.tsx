"use client";

import { Check, Plus } from "lucide-react";
import { useBasket, type BasketItem } from "@/components/basket/basket-context";
import { clsx } from "clsx";

export function AddToBasketButton({ item, className }: { item: BasketItem; className?: string }) {
  const { add, has } = useBasket();
  const inBasket = has(item.slug);

  return (
    <button
      type="button"
      aria-label={inBasket ? "Added to enquiry" : "Add to enquiry"}
      onClick={() => add(item)}
      disabled={inBasket}
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-accent/60 disabled:opacity-60",
        className
      )}
    >
      {inBasket ? <Check className="h-3.5 w-3.5 text-success" /> : <Plus className="h-3.5 w-3.5" />}
    </button>
  );
}
