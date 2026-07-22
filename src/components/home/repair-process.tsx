"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/business";
import { repairSteps as steps } from "@/data/repair-steps";

export function RepairProcess() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Repair"
            title="Laptop & desktop repair, done right"
            description="Screen, battery, keyboard, motherboard-level repair, and data recovery — with a clear process from drop-off to pickup."
          />
          <Button
            href={buildWhatsAppLink("Hi, I'd like to book a repair diagnosis.")}
            size="lg"
          >
            Book a Repair
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
