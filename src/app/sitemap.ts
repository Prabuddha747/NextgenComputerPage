import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://www.nextgencomputer.in";

const staticRoutes = [
  "",
  "/gaming-pcs",
  "/laptops",
  "/accessories",
  "/configurator",
  "/repair",
  "/services",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const productEntries = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries];
}
