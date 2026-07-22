import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/business";
import { serviceDetails } from "@/data/services-detail";

export const metadata: Metadata = {
  title: "Services — CCTV, Networking & Enterprise Solutions",
  description:
    "CCTV installation, networking, and enterprise IT solutions in Patna — bulk procurement, AMC support, and installation for homes, schools and offices.",
};

export default function ServicesPage() {
  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Services"
        title="Beyond the showroom"
        description="Installation, networking, and enterprise support — for homes, institutions, and corporate offices."
      />

      <div className="space-y-6">
        {serviceDetails.map((service) => (
          <div
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 rounded-3xl border border-border bg-surface p-8 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {service.description}
                </p>
                <Button
                  href={buildWhatsAppLink(`Hi, I'd like to enquire about ${service.title}.`)}
                  className="mt-6"
                >
                  Enquire on WhatsApp
                </Button>
              </div>
              <ul className="space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
