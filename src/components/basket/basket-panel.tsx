"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/components/basket/basket-context";
import { formatINR } from "@/lib/format";
import { buildWhatsAppLink } from "@/data/business";

export function BasketPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, clear } = useBasket();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const sendEnquiry = () => {
    const lines = items.map((item) => `• ${item.name} — ${formatINR(item.price)}`);
    const message = `Hi, I'd like to enquire about these products:\n${lines.join("\n")}\n\nEstimated total: ${formatINR(total)}`;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    clear();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col border-l border-border bg-background p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShoppingBag className="h-4.5 w-4.5 text-accent" />
                Your Enquiry
              </span>
              <button
                aria-label="Close"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <ShoppingBag className="h-10 w-10 text-muted/50" strokeWidth={1.25} />
                <p className="mt-4 text-sm text-muted">
                  Add a product here to build one enquiry for several items at once.
                </p>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted">{formatINR(item.price)}</p>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={() => remove(item.slug)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted">Estimated total</span>
                    <span className="font-display text-lg font-bold text-foreground">{formatINR(total)}</span>
                  </div>
                  <Button onClick={sendEnquiry} className="w-full">
                    Send Enquiry on WhatsApp
                  </Button>
                  <button
                    onClick={clear}
                    className="mt-3 w-full text-center text-xs text-muted hover:text-foreground"
                  >
                    Clear all
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
