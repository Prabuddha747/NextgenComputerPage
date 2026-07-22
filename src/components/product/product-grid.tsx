import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-muted">No products match that filter yet.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <ProductCard key={product.slug} product={product} priority={i === 0} />
      ))}
    </div>
  );
}
