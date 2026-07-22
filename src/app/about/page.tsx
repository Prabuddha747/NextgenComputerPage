import type { Metadata } from "next";
import { Award, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { TrustBar } from "@/components/home/trust-bar";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "26+ years of selling, building, and repairing computers in Patna — the story behind Next Gen Computer.",
};

const values = [
  {
    icon: Award,
    title: "26+ years of expertise",
    description: "From the CRT era to RTX-powered gaming rigs — we've kept up with every shift in the industry.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine parts, honest pricing",
    description: "Every component and repair part is sourced genuine, with pricing explained upfront.",
  },
  {
    icon: Users,
    title: "For every kind of buyer",
    description: "Students, gamers, professionals, schools, and corporate offices — we tailor advice to the buyer.",
  },
  {
    icon: HeartHandshake,
    title: "Service after the sale",
    description: "Warranty support, AMC, and repair are treated as seriously as the original sale.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-14">
        <SectionHeading
          eyebrow="About us"
          title={`${business.yearsExperience}+ years, one address on Dak Bunglow Road`}
          description="Next Gen Computer started as a small computer shop in Patna and has grown into the city's trusted destination for laptops, gaming PCs, repair, and IT services — without ever moving away from the street that built it."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <value.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <TrustBar />
    </>
  );
}
