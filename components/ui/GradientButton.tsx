import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/accents";

type Variant = "primary" | "lime" | "coral" | "secondary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 will-change-transform focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "text-base bg-dopamine bg-[length:200%_100%] hover:bg-[position:100%_0] text-[#03121a] shadow-[0_14px_40px_-16px_rgba(0,229,255,0.6)] hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-18px_rgba(0,229,255,0.7)]",
  lime: "bg-lime text-[#0c1400] hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-18px_rgba(182,255,0,0.5)]",
  coral: "bg-coral text-white hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-18px_rgba(255,77,109,0.55)]",
  secondary:
    "glass text-cream hover:border-cyan/50 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.3),0_18px_50px_-22px_rgba(0,229,255,0.5)] hover:-translate-y-0.5",
  ghost: "text-cream/75 border border-hairline hover:text-cream hover:border-white/25",
};

export function GradientButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  ariaLabel,
}: Props) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
