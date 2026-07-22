import type { ReactNode } from "react";
import { clsx } from "clsx";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>
  );
}
