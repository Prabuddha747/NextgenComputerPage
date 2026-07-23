import type { Metadata } from "next";
import { ArrowUpRight, Clock, Gem, Headphones, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceExplorer } from "@/components/services/service-explorer";
import { buildWhatsAppLink } from "@/data/business";

export const metadata: Metadata = {
  title: "Services — CCTV, Networking & Enterprise Solutions",
  description:
    "CCTV installation, networking, and enterprise IT solutions in Patna — bulk procurement, AMC support, and installation for homes, schools and offices.",
};

const trustPoints = [
  { icon: ShieldCheck, title: "Enterprise Grade", description: "Solutions built for reliability and scale." },
  { icon: Headphones, title: "Expert Support", description: "Experienced technicians for every install." },
  { icon: Gem, title: "Quality Assured", description: "Genuine components and installations." },
  { icon: Clock, title: "After Installation", description: "Ongoing maintenance & dedicated support." },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0 pt-14">
        <div className="flex flex-col gap-8 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Services <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="h-px w-10 bg-accent/40" />
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Technology, Installed <br />
              <span className="font-serif italic">
                Professionally<span className="text-accent">.</span>
              </span>
            </h1>
          </div>
          <div className="max-w-xs border-l-2 border-accent/50 pl-4 text-sm text-muted lg:mb-2">
            Enterprise networking. CCTV infrastructure. Bulk IT procurement. AMC support.
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <ServiceExplorer />
      </Section>

      <Section className="pt-0">
        <div className="border-t border-border pt-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent/40" />
            Ready to get started?
            <span className="h-px w-8 bg-accent/40" />
          </p>
          <h2 className="mx-auto max-w-xl font-serif text-3xl italic leading-tight text-foreground sm:text-4xl">
            Let&apos;s build your technology ecosystem<span className="text-accent">.</span>
          </h2>
          <Button
            href={buildWhatsAppLink("Hi, I'd like to talk about a CCTV/networking/enterprise IT project.")}
            variant="secondary"
            className="mt-8"
          >
            Talk to an Expert
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl border border-border bg-surface p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <point.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-xs text-muted">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
