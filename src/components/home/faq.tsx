"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { faqs } from "@/data/faq";
import { clsx } from "clsx";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Common questions" />
      <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="px-6">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">{item.question}</span>
                <Plus
                  className={clsx(
                    "h-4 w-4 shrink-0 text-accent transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-muted">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
