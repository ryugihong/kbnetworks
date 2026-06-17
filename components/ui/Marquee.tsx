import type { ReactNode } from "react";
import { cn } from "@/lib/accents";

type Props = {
  items: string[];
  fast?: boolean;
  /** glyph rendered between items */
  sep?: ReactNode;
  className?: string;
  itemClassName?: string;
};

const maskStyle = {
  WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
  maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
} as const;

export function Marquee({ items, fast = false, sep = "✦", className = "", itemClassName = "" }: Props) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden" style={maskStyle}>
      <div className={cn("marquee", fast && "marquee--fast", className)} style={{ gap: 48 }}>
        {row.map((w, i) => (
          <span key={i} className={cn("inline-flex items-center gap-12 whitespace-nowrap", itemClassName)}>
            {w}
            <span aria-hidden="true" className="opacity-40">
              {sep}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
