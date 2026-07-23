"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Building2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SceneHeading } from "@/components/scroll-story/scene-heading";
import { Button } from "@/components/ui/button";
import { business, buildWhatsAppLink } from "@/data/business";

// The "exhale" scene (design spec §3.4) — deliberately the quietest section on
// the page after three scenes of fan-deck motion. One calm blur+fade reveal,
// no staggering, no rotation.
export function SceneVisitUs() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <SceneHeading
            eyebrow="Visit us"
            title="Come see it in person"
            description="Walk in for hands-on demos, in-store diagnostics, or just to talk through what you need."
          />

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-white">{business.address.line1}</p>
                <p className="text-white/70">
                  {business.address.city}, {business.address.state}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                {business.hours.map((h) => (
                  <p key={h.days} className="text-white/70">
                    <span className="font-semibold text-white">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-white/70">
                Schools, colleges, and corporate offices — ask about bulk pricing and AMC support.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={business.address.mapsUrl} variant="primary">
              Get Directions
            </Button>
            <Button href={buildWhatsAppLink("Hi, I'd like to discuss a bulk/corporate order.")} variant="secondary">
              Corporate Enquiry
            </Button>
          </div>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Next Gen Computer location"
            src="https://maps.google.com/maps?q=Dak%20Bunglow%20Road%2C%20Patna&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full grayscale invert-0 dark:invert dark:contrast-[0.9] dark:hue-rotate-180"
            loading="lazy"
          />
        </div>
      </motion.div>
    </Section>
  );
}
