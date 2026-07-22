"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { buildTelLink, buildWhatsAppLink } from "@/data/business";

export function WhatsAppFab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
    >
      <motion.a
        href={buildTelLink()}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Call Next Gen Computer"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
          <path d="M16.01 3C9.38 3 4 8.36 4 14.98c0 2.2.58 4.27 1.6 6.06L4 29l8.2-1.55a12.9 12.9 0 0 0 3.8.58h.01c6.63 0 12.01-5.36 12.01-11.98C28.02 8.42 22.64 3 16.01 3Zm0 21.75h-.01a10 10 0 0 1-5.09-1.39l-.36-.22-4.86.92.93-4.73-.24-.38a9.87 9.87 0 0 1-1.53-5.27C4.85 8.5 9.9 5.25 16.01 5.25c2.63 0 5.1 1.03 6.96 2.9a9.75 9.75 0 0 1 2.88 6.96c0 5.5-4.5 9.64-9.84 9.64Zm5.4-7.24c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
