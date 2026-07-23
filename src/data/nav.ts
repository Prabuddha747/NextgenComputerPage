import type { Product } from "@/data/products";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  title: string;
  icon: Product["icon"];
  links: NavLink[];
}

export const shopMegaMenu: NavColumn[] = [
  {
    title: "Gaming PCs",
    icon: "tower",
    links: [
      { label: "All Gaming PCs", href: "/gaming-pcs" },
      { label: "Build Your Own", href: "/configurator" },
      { label: "Corsair ONE PCs", href: "/gaming-pcs?brand=Corsair" },
    ],
  },
  {
    title: "Laptops",
    icon: "laptop",
    links: [
      { label: "All Laptops", href: "/laptops" },
      { label: "Dell", href: "/laptops?brand=Dell" },
      { label: "HP", href: "/laptops?brand=HP" },
      { label: "Lenovo", href: "/laptops?brand=Lenovo" },
      { label: "Apple", href: "/laptops?brand=Apple" },
    ],
  },
  {
    title: "Accessories",
    icon: "keyboard",
    links: [{ label: "All Accessories", href: "/accessories" }],
  },
  {
    title: "Gaming Essentials",
    icon: "cpu",
    links: [
      { label: "Vengeance i7 Strike", href: "/product/vengeance-i7-strike" },
      { label: "Aurora TKL Mechanical Keyboard", href: "/product/rgb-mechanical-keyboard" },
      { label: "Curve 27 QHD 165Hz Monitor", href: "/product/curved-gaming-monitor" },
      { label: "Racer Pro Gaming Chair", href: "/product/racer-pro-gaming-chair" },
    ],
  },
];

export const primaryNav: NavLink[] = [
  { label: "Repair", href: "/repair" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const allMobileLinks: (NavLink & { icon: Product["icon"] })[] = [
  { label: "Shop All", href: "/shop", icon: "monitor" },
  { label: "Gaming PCs", href: "/gaming-pcs", icon: "tower" },
  { label: "Configurator", href: "/configurator", icon: "cpu" },
  { label: "Laptops", href: "/laptops", icon: "laptop" },
  { label: "Accessories", href: "/accessories", icon: "keyboard" },
  { label: "Repair", href: "/repair", icon: "cpu" },
  { label: "Services", href: "/services", icon: "router" },
  { label: "About", href: "/about", icon: "monitor" },
  { label: "Contact", href: "/contact", icon: "camera" },
];
