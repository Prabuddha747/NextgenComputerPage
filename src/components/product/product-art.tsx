import Image from "next/image";
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
  Armchair,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
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
  chair: Armchair,
};

export function ProductArt({
  product,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  product: Pick<Product, "icon" | "gradient" | "name" | "photo">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (product.photo) {
    return (
      <div className={clsx("relative overflow-hidden rounded-2xl bg-surface-2", className)}>
        <Image
          src={product.photo}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 55%, ${product.gradient[1]}55 100%)`,
          }}
        />
      </div>
    );
  }

  const Icon = productIcons[product.icon];
  return (
    <div
      className={clsx("relative flex items-center justify-center overflow-hidden rounded-2xl", className)}
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
