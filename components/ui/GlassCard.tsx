import type { ReactNode } from "react";
import { cn } from "@/lib/accents";

type Props = {
  children: ReactNode;
  className?: string;
  /** add hover lift + glow */
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

export function GlassCard({ children, className = "", interactive = false, as = "div" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "glass rounded-3xl p-7 shadow-card",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow",
        className
      )}
    >
      {children}
    </Tag>
  );
}
