import {
  Cpu,
  Headphones,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Printer,
  Router,
  Camera,
  Server,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Product } from "@/data/products";

export const productIcons: Record<Product["icon"], LucideIcon> = {
  tower: Server,
  laptop: Laptop,
  keyboard: Keyboard,
  mouse: Mouse,
  monitor: Monitor,
  cpu: Cpu,
  headphones: Headphones,
  camera: Camera,
  router: Router,
  printer: Printer,
};

export function ProductArt({
  product,
  className,
}: {
  product: Pick<Product, "icon" | "gradient" | "name">;
  className?: string;
}) {
  const Icon = productIcons[product.icon];
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden rounded-2xl", className)}
      style={{
        background: `radial-gradient(120% 120% at 20% 15%, ${product.gradient[0]}33, transparent 60%), radial-gradient(120% 120% at 80% 85%, ${product.gradient[1]}, var(--surface))`,
      }}
    >
      <Icon
        aria-hidden
        className="h-1/3 w-1/3 drop-shadow-[0_0_24px_rgba(34,211,238,0.25)]"
        style={{ color: product.gradient[0] }}
        strokeWidth={1.25}
      />
    </div>
  );
}
