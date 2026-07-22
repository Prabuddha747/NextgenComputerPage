import { business, buildWhatsAppLink } from "@/data/business";

export const heroSlides = [
  {
    photo: "https://images.unsplash.com/photo-1756576630180-653cbd594433",
    eyebrow: `${business.yearsExperience}+ Years in Patna`,
    headline: (
      <>
        Built for gamers. <br />
        Trusted by <span className="text-accent">Patna</span>.
      </>
    ),
    copy: "Laptops, custom gaming PCs, repair, CCTV and networking — from Dell to Apple, sold and serviced from Dak Bunglow Road.",
    primary: { label: "Explore Gaming PCs", href: "/gaming-pcs" },
    secondary: {
      label: "WhatsApp Us",
      href: buildWhatsAppLink("Hi, I'd like to know more about your products/services."),
    },
  },
  {
    photo: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    eyebrow: "Built & Benchmarked In-Store",
    headline: (
      <>
        Configure your <br />
        <span className="text-accent">dream build</span>.
      </>
    ),
    copy: "Pick your CPU, GPU, memory and cooling — every system is assembled and stress-tested at our workshop before it reaches you.",
    primary: { label: "Start Configuring", href: "/configurator" },
    secondary: { label: "View Prebuilts", href: "/gaming-pcs" },
  },
  {
    photo: "https://images.unsplash.com/photo-1636487658609-28282bb5a3a0",
    eyebrow: "Same-Day Diagnosis",
    headline: (
      <>
        Repairs done <br />
        <span className="text-accent">right the first time</span>.
      </>
    ),
    copy: "Screen, battery, motherboard-level repair and data recovery — with genuine parts and a warranty behind every job.",
    primary: { label: "Book a Repair", href: "/repair" },
    secondary: { label: "See Services", href: "/services" },
  },
] as const;
