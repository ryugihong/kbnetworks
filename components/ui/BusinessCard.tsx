import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  tag: string;
  desc?: string;
  tone?: string;
  href?: string;
  ratio?: string;
};

function ArrowUpRight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Tactile tone card (brands / work). Kept name `BusinessCard` for stability. */
export function BusinessCard({ title, tag, desc, tone = "#E7E2DA", href, ratio = "4/3" }: Props) {
  const inner: ReactNode = (
    <article className="group">
      <div className="relative overflow-hidden" style={{ borderRadius: 24, background: tone, aspectRatio: ratio }}>
        <span
          className="t-13 absolute left-4 top-4 rounded-full px-3 py-1.5 font-medium"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          {tag}
        </span>
        <span
          className="absolute bottom-4 right-4 grid place-items-center rounded-full text-paper transition-transform duration-300 group-hover:rotate-45"
          style={{ width: 48, height: 48, background: "#0E0E0E" }}
        >
          <ArrowUpRight />
        </span>
      </div>
      <h3 className="t-h4 mt-5">{title}</h3>
      {desc && <p className="t-17 text-muted mt-2">{desc}</p>}
    </article>
  );
  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
