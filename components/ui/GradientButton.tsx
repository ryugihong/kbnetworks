import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/accents";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  /** show the up-right arrow glyph */
  arrow?: boolean;
};

function ArrowUpRight() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill button (kept name `GradientButton` for import stability). */
export function GradientButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  ariaLabel,
  arrow = true,
}: Props) {
  const classes = cn(variant === "primary" ? "btn-primary" : "btn-ghost", className);
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
