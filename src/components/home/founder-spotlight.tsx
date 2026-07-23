"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { business } from "@/data/business";

const stats = [
  { icon: Award, label: `${business.yearsExperience}+ years hands-on` },
  { icon: ShieldCheck, label: "Genuine parts only" },
  { icon: Star, label: `${business.rating}★ rated in Patna` },
];

export function FounderSpotlight() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <SectionHeading
        eyebrow="Behind the counter"
        title="A real shop, a real person behind it"
        description={`${business.yearsExperience}+ years of hands-on experience, and the genuine stock to back it up.`}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-3xl border border-border bg-surface"
      >
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-5 p-8 text-center sm:p-12">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-accent/25 shadow-xl sm:h-44 sm:w-44">
              <Image
                src="/owner-circle.jpg"
                alt="Founder of Next Gen Computer at the Dak Bunglow Road store"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-foreground">Founder, Next Gen Computer</p>
              <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted">
                &ldquo;Every build that leaves this store, I&apos;d put in my own home.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 bg-white p-8 sm:p-12">
            <Image
              src="/product-collection.png"
              alt="Genuine components in stock at Next Gen Computer"
              width={1080}
              height={849}
              className="mx-auto h-auto w-full"
            />
            <p className="text-center text-sm text-neutral-500">
              Genuine components, always in stock — what you see is what&apos;s on our shelf.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-2.5 px-6 py-5 text-sm">
              <stat.icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
              <span className="font-medium text-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
