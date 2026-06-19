import type { ReactNode } from "react";
import { cn } from "@/lib/accents";

type Props = {
  children: ReactNode;
  className?: string;
  /** add hover lift */
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

/** White rounded card (kept name `GlassCard` for import stability). */
export function GlassCard({ children, className = "", interactive = false, as = "div" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "form-card p-8",
        interactive && "transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </Tag>
  );
}
