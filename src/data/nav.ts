import type { Product } from "@/data/products";

export interface NavLink {
  label: string;
  href: string;
  icon: Product["icon"];
  description?: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export const shopMegaMenu: NavColumn[] = [
  {
    title: "Gaming PCs",
    links: [
      { label: "All Gaming PCs", href: "/gaming-pcs", icon: "tower" },
      { label: "Build Your Own", href: "/configurator", icon: "cpu" },
    ],
  },
  {
    title: "Laptops",
    links: [
      { label: "All Laptops", href: "/laptops", icon: "laptop" },
      { label: "Dell", href: "/laptops?brand=Dell", icon: "laptop" },
      { label: "HP", href: "/laptops?brand=HP", icon: "laptop" },
      { label: "Apple", href: "/laptops?brand=Apple", icon: "laptop" },
    ],
  },
  {
    title: "Accessories",
    links: [
      { label: "Keyboards & Mice", href: "/accessories", icon: "keyboard" },
      { label: "Monitors", href: "/accessories", icon: "monitor" },
      { label: "Cooling", href: "/accessories", icon: "cpu" },
    ],
  },
];

export const primaryNav = [
  { label: "Repair", href: "/repair" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const allMobileLinks: NavLink[] = [
  { label: "Gaming PCs", href: "/gaming-pcs", icon: "tower" },
  { label: "Configurator", href: "/configurator", icon: "cpu" },
  { label: "Laptops", href: "/laptops", icon: "laptop" },
  { label: "Accessories", href: "/accessories", icon: "keyboard" },
  { label: "Repair", href: "/repair", icon: "cpu" },
  { label: "Services", href: "/services", icon: "router" },
  { label: "About", href: "/about", icon: "monitor" },
  { label: "Contact", href: "/contact", icon: "camera" },
];
