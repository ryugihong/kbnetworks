import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** show the leading dot */
  dot?: boolean;
  className?: string;
};

/** Eyebrow pill (kept name `GradientBadge` for import stability). */
export function GradientBadge({ children, dot = true, className = "" }: Props) {
  return (
    <span className={`pill t-eyebrow ${className}`}>
      {dot && <span className="pill-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
