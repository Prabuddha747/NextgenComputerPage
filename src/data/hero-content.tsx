import { business, buildWhatsAppLink } from "@/data/business";

// The homepage no longer opens on a photo carousel — this is chapter one of the
// scroll-scrubbed story, so there's one headline, not a rotating set of slides.
export const heroContent = {
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
} as const;
