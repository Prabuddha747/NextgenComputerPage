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
    links: [
      { label: "All Accessories", href: "/accessories" },
      { label: "Keyboards", href: "/accessories?q=keyboard" },
      { label: "Mice", href: "/accessories?q=mouse" },
      { label: "Monitors", href: "/accessories?q=monitor" },
      { label: "Cooling", href: "/accessories?q=cooling" },
      { label: "Headsets", href: "/accessories?q=headset" },
    ],
  },
  {
    title: "Services",
    icon: "router",
    links: [
      { label: "Laptop & Desktop Repair", href: "/repair" },
      { label: "CCTV Installation", href: "/services#cctv" },
      { label: "Networking", href: "/services#networking" },
      { label: "Enterprise Solutions", href: "/services#enterprise" },
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
