import { business, buildWhatsAppLink } from "@/data/business";

// The homepage no longer opens on a photo carousel — this is chapter one of the
// scroll-scrubbed story, so there's one headline, not a rotating set of slides.
export const heroContent = {
  eyebrow: `${business.yearsExperience}+ Years in Patna`,
  headline: (
    <>
      <span className="text-accent">Bihar&apos;s No. 1</span> <br />
      gaming brand.
    </>
  ),
  copy: "Every gaming PC benchmarked in-store before it leaves — Dell to Apple laptops, repair, CCTV and networking, all sold and serviced right here on Dak Bunglow Road for 26+ years.",
  primary: { label: "Explore Gaming PCs", href: "/gaming-pcs" },
  secondary: {
    label: "WhatsApp Us",
    href: buildWhatsAppLink("Hi, I'd like to know more about your products/services."),
  },
} as const;
