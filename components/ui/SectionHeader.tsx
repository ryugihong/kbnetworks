import type { ReactNode } from "react";
import { GradientBadge } from "./GradientBadge";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** constrain title width (px) */
  max?: number;
};

export function SectionHeader({ eyebrow, title, sub, align = "left", className = "", max = 900 }: Props) {
  return (
    <div
      className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && <GradientBadge>{eyebrow}</GradientBadge>}
      <h2 className="t-h3" style={{ maxWidth: max }}>
        {title}
      </h2>
      {sub && (
        <p className="t-20 text-muted" style={{ maxWidth: align === "center" ? 640 : 560 }}>
          {sub}
        </p>
      )}
    </div>
  );
}
