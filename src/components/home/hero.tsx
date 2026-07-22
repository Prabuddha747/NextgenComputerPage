"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, ensureGsapPlugins } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Container } from "@/components/ui/container";
import { business, buildWhatsAppLink } from "@/data/business";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapPlugins();
      gsap.to(".hero-bg", {
        y: 70,
        scale: 1.08,
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
    <section ref={root} className="pt-4 sm:pt-6">
      <Container>
        <div className="relative min-h-[78vh] overflow-hidden rounded-[2.5rem] border border-border">
          <div className="hero-bg absolute inset-0 scale-105">
            <Image
              src="https://images.unsplash.com/photo-1756576630180-653cbd594433"
              alt="Custom-built RGB gaming PC"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="relative flex min-h-[78vh] flex-col justify-center px-6 py-16 sm:px-14 sm:py-24">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                {business.yearsExperience}+ Years in Patna
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Built for gamers. <br />
                Trusted by <span className="text-accent">Patna</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 max-w-md text-base text-white/80 sm:text-lg"
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
                <Magnetic>
                  <Button href="/gaming-pcs" size="lg">
                    Explore Gaming PCs
                  </Button>
                </Magnetic>
                <Button
                  href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
                  variant="onImage"
                  size="lg"
                >
                  WhatsApp Us
                </Button>
              </motion.div>

              <div className="mt-10 flex items-center gap-2 text-sm text-white/80">
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-white">{business.rating}</span>
                <span>· {business.reviewCount.toLocaleString()}+ reviews</span>
              </div>
            </div>
          </div>

          <div className="hero-chip absolute right-8 top-10 hidden rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs shadow-lg backdrop-blur lg:block">
            <p className="font-semibold text-white">RTX 4070 Ti Super</p>
            <p className="text-white/70">In stock, ready to build</p>
          </div>
          <div className="hero-chip absolute bottom-12 right-8 hidden rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs shadow-lg backdrop-blur lg:block">
            <p className="font-semibold text-white">3-Year Warranty</p>
            <p className="text-white/70">On every custom build</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
