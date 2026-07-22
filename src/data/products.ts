// Real product photography isn't available yet, so `photo` points at license-free Unsplash
// stock (verified reachable, chosen for visual fit) as a stand-in. Swap each `photo` value
// for real in-store photography whenever it's ready — <ProductArt> falls back to icon/gradient
// art automatically if `photo` is omitted.

const photos = {
  pcOpenCaseCyan: "https://images.unsplash.com/photo-1756576630180-653cbd594433",
  pcOpenCaseCorsair: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
  laptopClean: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89",
  keyboardRgb: "https://images.unsplash.com/photo-1766656533864-2314b462d439",
  mouseRgb: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de",
  monitorCurved: "https://images.unsplash.com/photo-1540295373958-75c649d3275d",
  headset: "https://images.unsplash.com/photo-1553775282-20af80779df7",
  coolerAio: "https://images.unsplash.com/photo-1765824142326-8e9046b1f935",
  gamingChair: "https://images.unsplash.com/photo-1636487658609-28282bb5a3a0",
} as const;

export type ProductCategory = "gaming-pc" | "laptop" | "accessory";

export type Badge = "NEW" | "BESTSELLER" | "SALE";

export interface SpecLine {
  label: string;
  value: string;
}

export interface ConfigOption {
  label: string;
  detail: string;
  priceDelta: number;
}

export interface ConfigGroup {
  key: string;
  title: string;
  options: ConfigOption[];
}

export interface Product {
  slug: string;
  category: ProductCategory;
  brand: string;
  name: string;
  tagline: string;
  icon: "tower" | "laptop" | "keyboard" | "mouse" | "monitor" | "cpu" | "headphones" | "camera" | "router" | "printer" | "chair";
  gradient: [string, string];
  photo?: string;
  price: number;
  badges?: Badge[];
  specs: SpecLine[];
  description: string;
  configurable?: ConfigGroup[];
}

export const products: Product[] = [
  {
    slug: "vengeance-i7-strike",
    category: "gaming-pc",
    brand: "Next Gen Build",
    name: "Vengeance i7 Strike",
    tagline: "4K-ready gaming and streaming rig",
    icon: "tower",
    gradient: ["#22d3ee", "#0f172a"],
    photo: photos.pcOpenCaseCyan,
    price: 149999,
    badges: ["NEW", "BESTSELLER"],
    specs: [
      { label: "CPU", value: "Intel Core i7-14700K" },
      { label: "GPU", value: "NVIDIA RTX 4070 Ti Super" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
    ],
    description:
      "Built and stress-tested in-store for 4K gaming and creator workloads, with a 3-year on-site warranty from Next Gen Computer.",
    configurable: [
      {
        key: "cpu",
        title: "Processor",
        options: [
          { label: "Intel Core i7-14700K", detail: "20 cores, up to 5.6GHz", priceDelta: 0 },
          { label: "Intel Core i9-14900K", detail: "24 cores, up to 6.0GHz", priceDelta: 18000 },
        ],
      },
      {
        key: "gpu",
        title: "Graphics",
        options: [
          { label: "RTX 4070 Ti Super", detail: "16GB, 4K-ready", priceDelta: 0 },
          { label: "RTX 4080 Super", detail: "16GB, elite 4K performance", priceDelta: 42000 },
        ],
      },
      {
        key: "ram",
        title: "Memory",
        options: [
          { label: "32GB DDR5", detail: "Dual channel, 6000MHz", priceDelta: 0 },
          { label: "64GB DDR5", detail: "Dual channel, 6000MHz", priceDelta: 9000 },
        ],
      },
      {
        key: "storage",
        title: "Storage",
        options: [
          { label: "1TB NVMe SSD", detail: "Gen4, 7000MB/s read", priceDelta: 0 },
          { label: "2TB NVMe SSD", detail: "Gen4, 7000MB/s read", priceDelta: 7500 },
        ],
      },
      {
        key: "cooling",
        title: "Cooling",
        options: [
          { label: "Air Cooling", detail: "High static-pressure tower cooler", priceDelta: 0 },
          { label: "Liquid Cooling", detail: "240mm AIO, RGB pump head", priceDelta: 5500 },
        ],
      },
    ],
  },
  {
    slug: "neuron-ryzen-forge",
    category: "gaming-pc",
    brand: "Next Gen Build",
    name: "Neuron Ryzen Forge",
    tagline: "High refresh-rate esports machine",
    icon: "tower",
    gradient: ["#f43f5e", "#0f172a"],
    photo: photos.pcOpenCaseCorsair,
    price: 118999,
    badges: ["NEW"],
    specs: [
      { label: "CPU", value: "AMD Ryzen 7 7800X3D" },
      { label: "GPU", value: "NVIDIA RTX 4060 Ti" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
    ],
    description:
      "Tuned for 240Hz esports titles — Valorant, CS2, Apex — with the V-Cache advantage AMD's 3D chips are known for.",
    configurable: [
      {
        key: "ram",
        title: "Memory",
        options: [
          { label: "16GB DDR5", detail: "Dual channel, 6000MHz", priceDelta: 0 },
          { label: "32GB DDR5", detail: "Dual channel, 6000MHz", priceDelta: 6500 },
        ],
      },
      {
        key: "storage",
        title: "Storage",
        options: [
          { label: "1TB NVMe SSD", detail: "Gen4, 7000MB/s read", priceDelta: 0 },
          { label: "2TB NVMe SSD", detail: "Gen4, 7000MB/s read", priceDelta: 7500 },
        ],
      },
    ],
  },
  {
    slug: "corsair-one-a600",
    category: "gaming-pc",
    brand: "Corsair",
    name: "Corsair ONE a600",
    tagline: "Small-form-factor liquid-cooled power",
    icon: "tower",
    gradient: ["#a3e635", "#0f172a"],
    photo: photos.pcOpenCaseCyan,
    price: 349999,
    badges: ["SALE"],
    specs: [
      { label: "CPU", value: "AMD Ryzen 9 9900X3D" },
      { label: "GPU", value: "NVIDIA RTX 5080" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "2TB NVMe SSD" },
    ],
    description:
      "Factory-sealed premium SFF desktop, imported and warranty-backed through Next Gen Computer.",
  },
  {
    slug: "dell-xps-14-plus",
    category: "laptop",
    brand: "Dell",
    name: "XPS 14 Plus",
    tagline: "OLED creator laptop",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#38bdf8", "#0f172a"],
    price: 164999,
    badges: ["NEW"],
    specs: [
      { label: "CPU", value: "Intel Core Ultra 7" },
      { label: "GPU", value: "NVIDIA RTX 4060 Laptop" },
      { label: "RAM", value: "32GB" },
      { label: "Display", value: "14.5\" 3.2K OLED" },
    ],
    description: "A creator-grade OLED laptop for editing, design, and heavier coursework.",
  },
  {
    slug: "hp-victus-16",
    category: "laptop",
    brand: "HP",
    name: "Victus 16",
    tagline: "Budget gaming laptop",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#818cf8", "#0f172a"],
    price: 74999,
    specs: [
      { label: "CPU", value: "AMD Ryzen 5 7640HS" },
      { label: "GPU", value: "NVIDIA RTX 4050 Laptop" },
      { label: "RAM", value: "16GB" },
      { label: "Display", value: "16.1\" 144Hz FHD" },
    ],
    description: "The entry point into serious gaming without the flagship price tag.",
  },
  {
    slug: "lenovo-thinkpad-t14",
    category: "laptop",
    brand: "Lenovo",
    name: "ThinkPad T14 Gen 5",
    tagline: "Business & enterprise workhorse",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#f97316", "#0f172a"],
    price: 89999,
    badges: ["BESTSELLER"],
    specs: [
      { label: "CPU", value: "Intel Core Ultra 5" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Battery", value: "Up to 14 hrs" },
    ],
    description:
      "Our top recommendation for corporate and government bulk orders — durable, serviceable, and AMC-friendly.",
  },
  {
    slug: "asus-rog-strix-g16",
    category: "laptop",
    brand: "Asus",
    name: "ROG Strix G16",
    tagline: "High-performance gaming laptop",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#e879f9", "#0f172a"],
    price: 134999,
    specs: [
      { label: "CPU", value: "Intel Core i7-14650HX" },
      { label: "GPU", value: "NVIDIA RTX 4070 Laptop" },
      { label: "RAM", value: "16GB" },
      { label: "Display", value: "16\" 240Hz QHD" },
    ],
    description: "Desktop-class performance in a chassis built for long gaming sessions.",
  },
  {
    slug: "acer-swift-go-14",
    category: "laptop",
    brand: "Acer",
    name: "Swift Go 14",
    tagline: "Lightweight everyday laptop",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#4ade80", "#0f172a"],
    price: 54999,
    specs: [
      { label: "CPU", value: "Intel Core 5" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Weight", value: "1.3kg" },
    ],
    description: "The default recommendation for students who want all-day battery in a light shell.",
  },
  {
    slug: "msi-katana-15",
    category: "laptop",
    brand: "MSI",
    name: "Katana 15",
    tagline: "Balanced gaming + productivity",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#f87171", "#0f172a"],
    price: 89999,
    specs: [
      { label: "CPU", value: "Intel Core i5-13420H" },
      { label: "GPU", value: "NVIDIA RTX 4050 Laptop" },
      { label: "RAM", value: "16GB" },
      { label: "Display", value: "15.6\" 144Hz FHD" },
    ],
    description: "A dependable dual-purpose machine for students who game and work.",
  },
  {
    slug: "macbook-air-m3",
    category: "laptop",
    brand: "Apple",
    name: "MacBook Air 13\" M3",
    tagline: "Silent, all-day, effortless",
    icon: "laptop",
    photo: photos.laptopClean,
    gradient: ["#e5e7eb", "#0f172a"],
    price: 114900,
    badges: ["BESTSELLER"],
    specs: [
      { label: "Chip", value: "Apple M3" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Battery", value: "Up to 18 hrs" },
    ],
    description: "Our most-recommended laptop for professionals who live in a browser and an editor.",
  },
  {
    slug: "rgb-mechanical-keyboard",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Aurora TKL Mechanical Keyboard",
    tagline: "Hot-swappable, per-key RGB",
    icon: "keyboard",
    gradient: ["#22d3ee", "#a855f7"],
    photo: photos.keyboardRgb,
    price: 4499,
    badges: ["NEW"],
    specs: [
      { label: "Switches", value: "Hot-swap mechanical" },
      { label: "Lighting", value: "Per-key RGB" },
      { label: "Connection", value: "USB-C, wired" },
    ],
    description: "A daily-driver mechanical keyboard for gamers and typists alike.",
  },
  {
    slug: "rgb-wireless-mouse",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Vector Pro Wireless Mouse",
    tagline: "26,000 DPI, sub-60g",
    icon: "mouse",
    gradient: ["#f43f5e", "#f97316"],
    photo: photos.mouseRgb,
    price: 2999,
    specs: [
      { label: "Sensor", value: "26,000 DPI optical" },
      { label: "Weight", value: "58g" },
      { label: "Battery", value: "Up to 70 hrs" },
    ],
    description: "Tournament-grade wireless mouse for the competitive shelf.",
  },
  {
    slug: "liquid-cpu-cooler",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Cryo 240 AIO Cooler",
    tagline: "240mm liquid cooling, RGB pump",
    icon: "cpu",
    gradient: ["#38bdf8", "#22d3ee"],
    photo: photos.coolerAio,
    price: 5999,
    specs: [
      { label: "Radiator", value: "240mm" },
      { label: "Fans", value: "2x 120mm ARGB" },
      { label: "Socket support", value: "Intel & AMD" },
    ],
    description: "The go-to upgrade for anyone building or refreshing a rig in-store.",
  },
  {
    slug: "curved-gaming-monitor",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Curve 27 QHD 165Hz Monitor",
    tagline: "Immersive curved gaming display",
    icon: "monitor",
    gradient: ["#a855f7", "#22d3ee"],
    photo: photos.monitorCurved,
    price: 18999,
    badges: ["SALE"],
    specs: [
      { label: "Panel", value: "27\" QHD VA, 1500R curve" },
      { label: "Refresh rate", value: "165Hz" },
      { label: "Response time", value: "1ms" },
    ],
    description: "The most-upgraded monitor by customers building a gaming PC with us.",
  },
  {
    slug: "wireless-gaming-headset",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Aether Wireless Headset",
    tagline: "50mm drivers, dual wireless",
    icon: "headphones",
    gradient: ["#fb7185", "#22d3ee"],
    photo: photos.headset,
    price: 3499,
    specs: [
      { label: "Drivers", value: "50mm" },
      { label: "Connection", value: "2.4GHz + Bluetooth" },
      { label: "Battery", value: "Up to 80 hrs" },
    ],
    description: "Long-session comfort with clear comms for squad play.",
  },
  {
    slug: "racer-pro-gaming-chair",
    category: "accessory",
    brand: "Next Gen Gear",
    name: "Racer Pro Gaming Chair",
    tagline: "Ergonomic racing-style seat with lumbar support",
    icon: "chair",
    gradient: ["#f43f5e", "#0f172a"],
    photo: photos.gamingChair,
    price: 12999,
    badges: ["NEW"],
    specs: [
      { label: "Recline", value: "Up to 165°" },
      { label: "Support", value: "Adjustable lumbar + headrest pillow" },
      { label: "Armrests", value: "4D adjustable" },
    ],
    description: "The seat every multi-hour build or gaming session ends up needing — tested on our own showroom floor.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}
