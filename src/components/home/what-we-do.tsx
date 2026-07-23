import { Cpu, Wrench, Camera, Router, Building2, ShoppingBag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ScrollReel } from "@/components/home/scroll-reel";
import { business, buildWhatsAppLink } from "@/data/business";
import { repairSteps } from "@/data/repair-steps";

const icons = [ShoppingBag, Wrench, Cpu, Camera, Router, Building2];

export function WhatWeDo() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Sales, service, and everything in between"
        description="From a single laptop repair to a fully custom gaming build — sales and service, under one roof."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
          <ul className="space-y-5">
            {business.services.map((service, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={service.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{service.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{service.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/repair">Book a Repair</Button>
            <Button href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")} variant="secondary">
              WhatsApp Us
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <ScrollReel />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
        {repairSteps.map((step, i) => (
          <div key={step.title}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </span>
              <step.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
            </div>
            <p className="font-display text-sm font-semibold text-foreground">{step.title}</p>
            <p className="mt-1 text-xs text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
