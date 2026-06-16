import Link from "next/link";
import { ACCENTS, cn } from "@/lib/accents";
import type { BusinessArea } from "@/lib/business-areas";

export function BusinessCard({ area }: { area: BusinessArea }) {
  const a = ACCENTS[area.accent];
  return (
    <Link
      href={area.href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl glass p-7 shadow-card transition-all duration-300",
        "hover:-translate-y-1.5",
        a.hoverBorder,
        a.hoverGlow
      )}
    >
      {/* shine sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-lg", a.iconWrap)}>
        <span aria-hidden="true">{area.icon}</span>
      </div>

      <h3 className="text-lg font-bold tracking-tight text-cream">{area.title}</h3>
      <p className={cn("mb-3 text-[12px] font-semibold uppercase tracking-[0.12em]", a.text)}>{area.titleKo}</p>
      <p className="mb-5 text-sm leading-relaxed text-cream/65">{area.description}</p>

      <ul className="mt-auto space-y-2">
        {area.points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[13px] text-cream/70">
            <span className={cn("mt-1.5 h-1 w-1 shrink-0 rounded-full", a.bar)} aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <span className={cn("mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all group-hover:gap-3", a.text)}>
        자세히 보기 <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
