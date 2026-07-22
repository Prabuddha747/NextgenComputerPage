"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Star, Sparkles } from "lucide-react";
import { Server } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, ensureGsapPlugins } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { business, buildWhatsAppLink } from "@/data/business";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapPlugins();
      gsap.to(".hero-art", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-chip", {
        y: -24,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="pt-10 sm:pt-14">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface px-6 py-16 sm:px-14 sm:py-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 15% 10%, var(--accent) 0%, transparent 60%), radial-gradient(50% 50% at 100% 100%, var(--accent) 0%, transparent 55%)",
              opacity: 0.14,
            }}
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                {business.yearsExperience}+ Years in Patna
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
              >
                Built for gamers. <br />
                Trusted by <span className="text-accent">Patna</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 max-w-md text-base text-muted sm:text-lg"
              >
                Laptops, custom gaming PCs, repair, CCTV and networking — from Dell to Apple,
                sold and serviced from Dak Bunglow Road for over {business.yearsExperience} years.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Button href="/gaming-pcs" size="lg">
                  Explore Gaming PCs
                </Button>
                <Button
                  href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
                  variant="secondary"
                  size="lg"
                >
                  WhatsApp Us
                </Button>
              </motion.div>

              <div className="mt-10 flex items-center gap-2 text-sm text-muted">
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{business.rating}</span>
                <span>· {business.reviewCount.toLocaleString()}+ reviews</span>
              </div>
            </div>

            <div className="relative hidden aspect-square items-center justify-center lg:flex">
              <div className="hero-art relative flex h-[80%] w-[80%] items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent/20 to-transparent">
                <Server
                  className="h-1/2 w-1/2 text-accent drop-shadow-[0_0_60px_rgba(34,211,238,0.35)]"
                  strokeWidth={1}
                />
              </div>
              <div className="hero-chip absolute left-2 top-8 rounded-2xl border border-border bg-background/80 px-4 py-3 text-xs shadow-lg backdrop-blur">
                <p className="font-semibold text-foreground">RTX 4070 Ti Super</p>
                <p className="text-muted">In stock, ready to build</p>
              </div>
              <div className="hero-chip absolute bottom-10 right-0 rounded-2xl border border-border bg-background/80 px-4 py-3 text-xs shadow-lg backdrop-blur">
                <p className="font-semibold text-foreground">3-Year Warranty</p>
                <p className="text-muted">On every custom build</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
