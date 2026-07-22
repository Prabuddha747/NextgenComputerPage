import { Search, FileCheck, Wrench, PackageCheck, type LucideIcon } from "lucide-react";

export const repairSteps: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Search, title: "Diagnose", description: "Free initial diagnosis, usually within the hour." },
  { icon: FileCheck, title: "Quote", description: "Transparent quote before any work begins." },
  { icon: Wrench, title: "Repair", description: "Genuine parts, most repairs done same-day." },
  { icon: PackageCheck, title: "Pickup", description: "Collect in-store or request doorstep delivery." },
];
