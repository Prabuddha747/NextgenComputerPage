"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { business } from "@/data/business";

export function FounderSpotlight() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <SectionHeading
        eyebrow="Behind the counter"
        title="A real shop, a real person behind it"
        description={`${business.yearsExperience}+ years of hands-on experience, and the genuine stock to back it up.`}
      />

      <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative lg:col-span-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-2xl">
            <Image
              src="/owner.jpg"
              alt="Founder of Next Gen Computer at the Dak Bunglow Road store"
              fill
              sizes="(min-width: 1024px) 32vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="font-display text-xl font-bold text-white">Founder, Next Gen Computer</p>
              <p className="mt-1 text-sm text-white/75">
                &ldquo;Every build that leaves this store, I&apos;d put in my own home.&rdquo;
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-border bg-surface px-4 py-3 text-xs shadow-lg sm:block">
            <p className="font-display font-semibold text-foreground">{business.yearsExperience}+ Years</p>
            <p className="text-muted">Hands-on, in-store</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative lg:col-span-3 lg:-ml-10"
        >
          <div aria-hidden className="absolute inset-8 rounded-3xl bg-accent/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-10">
            <Image
              src="/product-collection.png"
              alt="Genuine components in stock at Next Gen Computer"
              width={1080}
              height={849}
              className="mx-auto h-auto w-full max-w-md"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted lg:text-left">
            Genuine components, always in stock — what you see is what&apos;s on our shelf.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
