"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { allMobileLinks, primaryNav } from "@/data/nav";
import { productIcons } from "@/components/product/product-art";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/data/business";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 w-[82%] max-w-sm overflow-y-auto border-l border-border bg-background p-6 md:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-1">
              {allMobileLinks.map((link, i) => {
                const Icon = productIcons[link.icon];
                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
                    >
                      <Icon className="h-[18px] w-[18px] text-accent-secondary" strokeWidth={1.5} />
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="my-6 h-px bg-border" />

            <ul className="space-y-1">
              {primaryNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
              className="mt-8 w-full"
            >
              Chat on WhatsApp
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
