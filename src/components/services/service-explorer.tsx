"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DuotonePhoto } from "@/components/ui/duotone-photo";
import { buildWhatsAppLink } from "@/data/business";
import { serviceDetails } from "@/data/services-detail";
import { clsx } from "clsx";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
      {serviceDetails.map((service, i) => {
        const isActive = active === i;
        return (
          <div key={service.slug} id={service.slug} className="scroll-mt-24">
            <button
              onClick={() => setActive(isActive ? -1 : i)}
              className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
              aria-expanded={isActive}
            >
              {service.photo ? (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <DuotonePhoto src={service.photo} alt="" className="h-full w-full" sizes="56px" />
                  <span
                    className={clsx(
                      "absolute inset-0 flex items-center justify-center transition-colors",
                      isActive ? "bg-accent/70" : "bg-black/40"
                    )}
                  >
                    <service.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </span>
                </span>
              ) : (
                <span
                  className={clsx(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"
                  )}
                >
                  <service.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-semibold text-foreground">
                  {service.title}
                </span>
                <span className="mt-0.5 hidden truncate text-sm text-muted sm:block">{service.points[0]}</span>
              </span>
              <span className="hidden shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted sm:block">
                {service.points.length} details
              </span>
              <ChevronDown
                className={clsx("h-4 w-4 shrink-0 text-muted transition-transform", isActive && "rotate-180 text-accent")}
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
                  <div
                    className={clsx(
                      "grid gap-6 px-6 pb-8 sm:px-8",
                      service.photo ? "lg:grid-cols-[1fr_1fr_1fr]" : "lg:grid-cols-[1.2fr_1fr]"
                    )}
                  >
                    {service.photo && (
                      <DuotonePhoto src={service.photo} alt={service.title} className="aspect-[4/3] w-full" />
                    )}
                    <div>
                      <p className="text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
                      <Button
                        href={buildWhatsAppLink(`Hi, I'd like to enquire about ${service.title}.`)}
                        className="mt-6"
                      >
                        Enquire on WhatsApp
                      </Button>
                    </div>
                    <ul className="space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
