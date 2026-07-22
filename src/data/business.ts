// TODO: replace WHATSAPP_NUMBER and PHONE_NUMBER with the real numbers (E.164, no spaces).
export const WHATSAPP_NUMBER = "911234567890";
export const PHONE_NUMBER = "+911234567890";

export const business = {
  name: "Next Gen Computer",
  tagline: "Patna's Trusted Tech Partner for 26+ Years",
  yearsExperience: 26,
  rating: 4.9,
  reviewCount: 2700,
  address: {
    line1: "Dak Bunglow Road",
    city: "Patna",
    state: "Bihar",
    // TODO: replace with the real Google Maps place link / embed src.
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dak+Bunglow+Road+Patna",
  },
  hours: [
    { days: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
  brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Apple"],
  services: [
    {
      title: "Laptop & Desktop Sales",
      description:
        "New and certified pre-owned machines from every major brand, matched to your budget and workload.",
    },
    {
      title: "Laptop & Desktop Repair",
      description:
        "Diagnostics, screen and battery replacement, motherboard-level repair, data recovery.",
    },
    {
      title: "Gaming PCs & Custom Builds",
      description:
        "Prebuilt rigs or a fully custom build configured to your budget, benchmarked before it leaves the store.",
    },
    {
      title: "CCTV Installation",
      description:
        "Site survey, camera selection, installation and remote-viewing setup for homes and businesses.",
    },
    {
      title: "Networking",
      description:
        "Wired and Wi-Fi networking for homes, offices, and campuses — routers, switches, structured cabling.",
    },
    {
      title: "Enterprise Solutions",
      description:
        "Bulk procurement, AMC support, and IT infrastructure for schools, colleges, and corporate offices.",
    },
  ],
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildTelLink() {
  return `tel:${PHONE_NUMBER}`;
}
