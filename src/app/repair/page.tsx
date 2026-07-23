import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Wrench, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { WhatsAppEnquiryForm } from "@/components/forms/whatsapp-enquiry-form";
import { buildWhatsAppLink } from "@/data/business";
import { repairSteps as steps } from "@/data/repair-steps";

export const metadata: Metadata = {
  title: "Laptop & Desktop Repair",
  description:
    "Laptop and desktop repair in Patna — screen, battery, keyboard, motherboard-level repair and data recovery. Free diagnosis, most repairs done same-day.",
};

const covered = [
  "Screen replacement",
  "Battery replacement",
  "Keyboard & trackpad repair",
  "Motherboard-level repair",
  "Data recovery",
  "Overheating & fan issues",
  "Liquid damage repair",
  "OS reinstall & virus removal",
];

const trustPoints = [
  { icon: Zap, title: "Free Diagnosis", description: "No charge to find out what's wrong." },
  { icon: ShieldCheck, title: "Genuine Parts", description: "No greymarket components, ever." },
  { icon: Clock, title: "Same-Day Service", description: "Most repairs done within the day." },
  { icon: Wrench, title: "Warranty Backed", description: "Every repair covered after the fact." },
];

export default function RepairPage() {
  return (
    <>
      <Section className="pb-0 pt-14">
        <div className="flex flex-col gap-8 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Repair <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="h-px w-10 bg-accent/40" />
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Laptop & Desktop <br />
              Repair, Done Right<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="max-w-xs border-l-2 border-accent/50 pl-4 text-sm text-muted lg:mb-2">
            26+ years of hands-on repair experience — from a cracked screen to a dead motherboard.
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 border-t border-border pt-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">What we repair</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {covered.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">Book a diagnosis</h2>
            <WhatsAppEnquiryForm intro="Hi, I'd like to book a repair diagnosis." />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="border-t border-border pt-14 text-center">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent/40" />
            Something broken?
            <span className="h-px w-8 bg-accent/40" />
          </p>
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Let&apos;s get it fixed, same day<span className="text-accent">.</span>
          </h2>
          <Button
            href={buildWhatsAppLink("Hi, I'd like to book a repair diagnosis.")}
            variant="secondary"
            className="mt-8"
          >
            Talk to a Technician
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
