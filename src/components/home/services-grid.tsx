"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Cpu, Wrench, Camera, Router, Building2, ShoppingBag } from "lucide-react";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { Section, SectionHeading } from "@/components/ui/section";
import { business } from "@/data/business";

const icons = [ShoppingBag, Wrench, Cpu, Camera, Router, Building2];

export function ServicesGrid() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapPlugins();
      ScrollTrigger.batch(".service-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, overwrite: true }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { opacity: 0, y: 32, stagger: 0.08, duration: 0.3, overwrite: true }),
      });
    },
    { scope: root }
  );

  return (
    <Section>
      <div ref={root}>
        <SectionHeading
          eyebrow="What we do"
          title="Everything your setup needs, under one roof"
          description="From a single laptop repair to outfitting an entire office — sales, service, and installation."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={service.title}
                className="service-card rounded-2xl border border-border bg-surface p-6 opacity-0 translate-y-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
