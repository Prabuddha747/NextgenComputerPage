import { Cpu, Keyboard, Server } from "lucide-react";

export const serviceDetails = [
  {
    slug: "gaming-builds",
    category: "Build solutions",
    title: "Custom Gaming PC Builds",
    icon: Server,
    photo: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    useCases: ["4K Gaming Rigs", "Esports & Competitive PCs", "Streaming Setups", "Budget to Enthusiast"],
    description:
      "Prebuilt rigs or a fully custom configuration — every build assembled, stress-tested, and benchmarked at our Dak Bunglow Road workshop before it reaches you.",
    points: [
      "Choose your own CPU, GPU, RAM, storage, and cooling",
      "Every build benchmarked before it leaves the store",
      "Cable management and RGB tuning included",
      "Instant quote from the online configurator",
    ],
  },
  {
    slug: "upgrades",
    category: "Upgrade solutions",
    title: "PC Upgrades & Component Installation",
    icon: Cpu,
    photo: "https://images.unsplash.com/photo-1644987708868-1a97a5341ec3",
    useCases: ["Graphics Card Upgrades", "RAM & Storage Expansion", "CPU & Cooler Swaps", "Power Supply Upgrades"],
    description:
      "Bring an older PC back to life — genuine components only, and every upgrade benchmarked afterward so you can see the difference.",
    points: [
      "Genuine GPUs, RAM, storage, and cooling only",
      "Compatibility checked before you buy anything",
      "Most upgrades installed same-day",
      "Re-benchmarked after the upgrade, before pickup",
    ],
  },
  {
    slug: "peripherals",
    category: "Peripheral solutions",
    title: "Gaming Setup & Peripherals",
    icon: Keyboard,
    photo: "https://images.unsplash.com/photo-1766656533864-2314b462d439",
    useCases: ["Mechanical Keyboards", "Gaming Mice", "Curved Monitors", "Cooling & Seating"],
    description:
      "Keyboards, mice, monitors, cooling, and seating — the finishing touches for any gaming or work setup, all available to try in-store.",
    points: [
      "Demo units in-store — try before you buy",
      "RGB and ergonomic options for every budget",
      "Genuine warranty on every accessory",
      "Bundle pricing when paired with a new build",
    ],
  },
];
