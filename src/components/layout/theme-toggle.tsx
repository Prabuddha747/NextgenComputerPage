"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9, rotate: 15 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/60"
    >
      <Moon className="hidden h-5 w-5 dark:block" />
      <Sun className="block h-5 w-5 dark:hidden" />
    </motion.button>
  );
}
