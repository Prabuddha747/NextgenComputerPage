import { clsx } from "clsx";
import type { Badge as BadgeKind } from "@/data/products";

const styles: Record<BadgeKind, string> = {
  NEW: "bg-accent/15 text-accent border-accent/30",
  BESTSELLER: "bg-success/15 text-success border-success/30",
  SALE: "bg-sale/15 text-sale border-sale/30",
};

export function Badge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        styles[kind]
      )}
    >
      {kind}
    </span>
  );
}
