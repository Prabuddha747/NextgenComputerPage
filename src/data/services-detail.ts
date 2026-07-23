import { Camera, Router, Building2 } from "lucide-react";

export const serviceDetails = [
  {
    slug: "cctv",
    title: "CCTV Installation",
    icon: Camera,
    photo: "https://images.unsplash.com/photo-1643123182527-3bd30840e7ed",
    description:
      "Site survey, camera selection, and professional installation for homes, shops, and offices — with remote viewing set up on your phone before we leave.",
    points: [
      "Free on-site survey and camera placement plan",
      "HD & night-vision dome / bullet cameras",
      "DVR/NVR setup with cloud or local storage",
      "Mobile app configuration for remote viewing",
    ],
  },
  {
    slug: "networking",
    title: "Networking",
    icon: Router,
    photo: "https://images.unsplash.com/photo-1750710583720-8b3bdd0f658a",
    description:
      "Wired and Wi-Fi networking for homes, offices, and campuses — from a single router to structured cabling across a building.",
    points: [
      "Router, switch, and access point setup",
      "Structured cabling for offices and campuses",
      "Wi-Fi coverage planning for large spaces",
      "Network security and guest-network setup",
    ],
  },
  {
    slug: "enterprise",
    title: "Enterprise Solutions",
    icon: Building2,
    description:
      "Bulk procurement and ongoing IT support for schools, colleges, government offices, and corporate clients.",
    points: [
      "Bulk laptop/desktop procurement with custom quotes",
      "Annual Maintenance Contracts (AMC)",
      "Computer lab setup for schools & colleges",
      "Dedicated account support for repeat orders",
    ],
  },
];
