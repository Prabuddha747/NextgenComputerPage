import type { Metadata } from "next";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { RadialProgress } from "@/components/ui/radial-progress";
import { WhoWeAreCard } from "@/components/about/who-we-are-card";
import { TrustBar } from "@/components/home/trust-bar";
import { business, buildWhatsAppLink } from "@/data/business";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "26+ years of selling, building, and repairing computers in Patna — the story behind Next Gen Computer.",
};

const satisfactionScore = Math.round((business.rating / 5) * 100);

const values = [
  {
    title: "26+ years of expertise",
    description: "From the CRT era to RTX-powered gaming rigs — we've kept up with every shift in the industry.",
  },
  {
    title: "Genuine parts, honest pricing",
    description: "Every component and repair part is sourced genuine, with pricing explained upfront.",
  },
  {
    title: "For every kind of buyer",
    description: "Students, gamers, professionals, schools, and corporate offices — we tailor advice to the buyer.",
  },
  {
    title: "Service after the sale",
    description: "Warranty support, AMC, and repair are treated as seriously as the original sale.",
  },
];

const spotlight = testimonials[0];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">About us</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {business.yearsExperience}+ years of trust, built one repeat customer at a time.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
              Next Gen Computer started as a small shop on Dak Bunglow Road and grew into the city&apos;s trusted
              destination for laptops, gaming PCs, repair, and IT services — without ever moving away from the
              street that built it.
            </p>
            <Button href={buildWhatsAppLink("Hi, I'd like to know more about Next Gen Computer.")} className="mt-8">
              WhatsApp Us
            </Button>
          </div>

          {/* Same treatment as the founder photo on the homepage's Behind the
              Counter scene — contained card with a soft glow ring, not a
              full-bleed banner competing with the headline for attention. */}
          <div className="relative mx-auto aspect-4/5 w-full max-w-md">
            <div className="absolute -inset-0.75 rounded-4xl bg-linear-to-br from-accent via-[#a78bfa] to-[#c9a15a] opacity-70 blur-[3px]" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-black/40">
              <Image
                src="/owner-office.png"
                alt="Founder of Next Gen Computer at the Dak Bunglow Road store"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
          <WhoWeAreCard />

          <div className="rounded-3xl border border-border bg-surface p-8">
            <RadialProgress
              value={satisfactionScore}
              sublabel={`${business.rating}★ from ${business.reviewCount.toLocaleString()}+ reviews`}
            />
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89"
              alt="A laptop ready for sale at Next Gen Computer"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">What we do</p>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {business.services.map((service) => (
              <div
                key={service.title}
                className="w-60 shrink-0 rounded-2xl border border-border bg-surface p-5"
              >
                <p className="font-display font-semibold text-foreground">{service.title}</p>
                <p className="mt-1.5 text-xs text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-success/20 bg-success/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-success">What we stock</p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground">
              {business.brands.join(" · ")}
            </p>
            <p className="mt-2 text-sm text-muted">Every part genuine, every price explained upfront.</p>
          </div>
          <div className="rounded-3xl border border-accent/20 bg-accent/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Our reach</p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground">
              {business.yearsExperience}+ years · {business.reviewCount.toLocaleString()}+ reviews
            </p>
            <p className="mt-2 text-sm text-muted">One shop, thousands of repeat customers.</p>
          </div>
          <div className="rounded-3xl border border-sale/20 bg-sale/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-sale">Community</p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground">
              Schools · Colleges · Corporate offices
            </p>
            <p className="mt-2 text-sm text-muted">Bulk orders and AMC support for institutions across Patna.</p>
          </div>
        </div>
      </Section>

      <Section id="why-choose-us">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Why choose us" title="What 26 years actually buys you" />
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title}>
                  <p className="font-display font-semibold text-foreground">{value.title}</p>
                  <p className="mt-1.5 text-sm text-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl border border-border lg:mx-0 lg:ml-auto">
            <Image
              src="/owner-portrait.png"
              alt={`${business.founderName}, founder of Next Gen Computer`}
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
          <Quote className="h-9 w-9 text-accent/50" strokeWidth={1.5} />
          <blockquote className="mt-4 font-display text-xl font-medium text-foreground sm:text-2xl">
            &ldquo;{spotlight.quote}&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">{spotlight.name}</p>
              <p className="text-sm text-muted">{spotlight.context}</p>
            </div>
            <div className="flex text-accent">
              {Array.from({ length: Math.round(spotlight.rating) }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-border bg-accent/10 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Have a question, or want to just walk in?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
            Dak Bunglow Road, Patna — open every day. Message us and we&apos;ll answer directly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={buildWhatsAppLink("Hi, I have a question.")}>WhatsApp Us</Button>
            <Button href="/contact" variant="secondary">
              Get Directions
            </Button>
          </div>
        </div>
      </Section>

      <TrustBar />
    </>
  );
}
