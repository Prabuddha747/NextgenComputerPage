import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { WhatsAppEnquiryForm } from "@/components/forms/whatsapp-enquiry-form";
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

export default function RepairPage() {
  return (
    <Section className="pt-14">
      <SectionHeading
        eyebrow="Repair"
        title="Laptop & desktop repair, done right"
        description="26+ years of hands-on repair experience — from a cracked screen to a dead motherboard."
      />

      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {i + 1}
              </span>
              <step.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
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
  );
}
