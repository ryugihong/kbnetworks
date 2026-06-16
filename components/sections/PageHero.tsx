import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** breadcrumb current-page label */
  crumb: string;
};

export function PageHero({ eyebrow, title, lede, crumb }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-hairline">
      <AnimatedBackground variant="section" />
      <div className="container-x relative z-10 pb-14 pt-14 md:pb-20 md:pt-20">
        <nav aria-label="breadcrumb" className="mb-7 flex items-center gap-2 text-[12px] text-cream/45">
          <Link href="/" className="transition-colors hover:text-cyan">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-cream/70">{crumb}</span>
        </nav>
        <p className="label-eyebrow mb-4 animate-fade-up">{eyebrow}</p>
        <h1 className="max-w-4xl animate-fade-up text-balance text-4xl font-black tracking-tight sm:text-5xl md:text-6xl md:leading-[1.05]" style={{ animationDelay: "60ms" }}>
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/65" style={{ animationDelay: "120ms" }}>
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
