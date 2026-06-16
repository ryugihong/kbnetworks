import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** show a pulsing live dot */
  dot?: boolean;
  className?: string;
};

export function GradientBadge({ children, dot = false, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/80 ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
        </span>
      )}
      {children}
    </span>
  );
}
