import Image from "next/image";
import { clsx } from "clsx";

// Grayscale + accent-tint overlay so stock photos with unrelated backgrounds
// (a yellow product shot, a bright office) still read as one cohesive system.
export function DuotonePhoto({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={clsx("relative overflow-hidden rounded-2xl bg-surface-2", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover grayscale contrast-[1.1]" />
      <div aria-hidden className="absolute inset-0 bg-accent/25 mix-blend-color" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
    </div>
  );
}
