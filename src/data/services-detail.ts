import { Camera, Router, Server } from "lucide-react";

export const serviceDetails = [
  {
    slug: "cctv",
    category: "Surveillance solutions",
    title: "CCTV Infrastructure",
    icon: Camera,
    photo: "https://images.unsplash.com/photo-1643123182527-3bd30840e7ed",
    useCases: ["Commercial Spaces", "Residential Buildings", "Warehouses", "Schools & Institutions"],
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
    category: "Network solutions",
    title: "Enterprise Networking",
    icon: Router,
    photo: "https://images.unsplash.com/photo-1750711731797-25c3f2551ff8",
    useCases: ["Structured Cabling", "Router & Switch Setup", "Secure Connectivity", "Wi-Fi Solutions"],
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
    category: "Enterprise solutions",
    title: "IT Infrastructure Solutions",
    icon: Server,
    photo: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee",
    useCases: ["Server & Storage Solutions", "Data Center Setup", "System Integration", "IT Support & Maintenance"],
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
