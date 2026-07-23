"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ScrollReel } from "@/components/home/scroll-reel";
import { buildWhatsAppLink } from "@/data/business";
import { repairSteps } from "@/data/repair-steps";

export function WhatWeDo() {
  return (
    <div>
      <Container className="pt-20 pb-6 sm:pt-28">
        <SectionHeading
          eyebrow="What we do"
          title="Sales, service, and everything in between"
          description="From a single laptop repair to a fully custom gaming build — sales and service, under one roof. Scroll on."
        />
      </Container>

      <ScrollReel />

      <Section className="pt-14">
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Button href="/repair">Book a Repair</Button>
          <Button href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")} variant="secondary">
            WhatsApp Us
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
          {repairSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <step.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
              </div>
              <p className="font-display text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-xs text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
