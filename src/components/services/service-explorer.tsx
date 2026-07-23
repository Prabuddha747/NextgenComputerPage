"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/business";
import { serviceDetails } from "@/data/services-detail";
import { clsx } from "clsx";

// Same teal glow the rest of the site uses (atmosphere blobs, the RGB owner-photo
// ring) — not a photo, since these three rows are service *categories*, not a
// specific installed job. A glow-lit outline icon reads as honest here in a way
// a stock photo pretending to be "our CCTV job" wouldn't.
function ServiceVisual({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-black">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: "radial-gradient(60% 100% at 50% 100%, rgba(62,216,195,0.35), transparent 70%)",
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <Icon
          className="h-20 w-20 text-foreground/85 drop-shadow-[0_0_24px_rgba(62,216,195,0.4)] sm:h-24 sm:w-24"
          strokeWidth={1}
        />
      </div>
    </div>
  );
}

export function ServiceExplorer() {
  const [active, setActive] = useState(-1);

  return (
    <div className="divide-y divide-border border-t border-border">
      {serviceDetails.map((service, i) => {
        const isActive = active === i;
        return (
          <div key={service.slug} id={service.slug} className="scroll-mt-24 py-10 sm:py-12">
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              {/* Number + connector rail, decorative — echoes the reference's
                  numbered list without needing a literal illustration asset. */}
              <div className="hidden flex-col items-center sm:flex">
                <span className="font-display text-6xl font-bold text-foreground/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 h-full w-px bg-border" />
                <span className="-mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{service.category}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setActive(isActive ? -1 : i)}
                    className="group mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent"
                    aria-expanded={isActive}
                  >
                    {isActive ? "Show less" : "Learn more"}
                    <ArrowRight
                      className={clsx("h-4 w-4 transition-transform", isActive ? "rotate-90" : "group-hover:translate-x-1")}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-6 space-y-3">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <Button
                          href={buildWhatsAppLink(`Hi, I'd like to enquire about ${service.title}.`)}
                          className="mt-6"
                        >
                          Enquire on WhatsApp
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <ServiceVisual icon={service.icon} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
