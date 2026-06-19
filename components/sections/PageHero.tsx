import Link from "next/link";
import type { ReactNode } from "react";
import { GradientBadge } from "@/components/ui/GradientBadge";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumb: string;
  /** optional intermediate breadcrumb (e.g. Services) rendered between Home and crumb */
  parent?: { label: string; href: string };
};

export function PageHero({ eyebrow, title, lede, crumb, parent }: Props) {
  return (
    <header className="container-x" style={{ paddingTop: 72, paddingBottom: 48 }}>
      <nav aria-label="breadcrumb" className="t-13 text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-dark">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        {parent && (
          <>
            <Link href={parent.href} className="hover:text-dark">
              {parent.label}
            </Link>
            <span aria-hidden="true">›</span>
          </>
        )}
        <span style={{ color: "var(--dark)" }}>{crumb}</span>
      </nav>
      <div className="mt-7">
        <GradientBadge>{eyebrow}</GradientBadge>
      </div>
      <h1 className="t-h2 mt-6" style={{ maxWidth: 1000 }}>
        {title}
      </h1>
      {lede && (
        <p className="t-20 text-muted mt-6" style={{ maxWidth: 700 }}>
          {lede}
        </p>
      )}
    </header>
  );
}
