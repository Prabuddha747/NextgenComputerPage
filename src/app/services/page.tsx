import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceExplorer } from "@/components/services/service-explorer";

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
        description="Installation, networking, and enterprise support — for homes, institutions, and corporate offices. Tap any service to see the details."
      />
      <ServiceExplorer />
    </Section>
  );
}
