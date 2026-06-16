import { ACCENTS, cn } from "@/lib/accents";
import type { AccentKey } from "@/lib/site-data";

type Props = {
  value: string;
  label: string;
  accent?: AccentKey;
};

export function StatCard({ value, label, accent = "cyan" }: Props) {
  const a = ACCENTS[accent];
  return (
    <div className="group relative overflow-hidden rounded-3xl glass p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <span className={cn("absolute left-0 top-0 h-full w-1", a.bar)} aria-hidden="true" />
      <p className={cn("text-4xl font-black tracking-tight md:text-5xl", a.text)}>{value}</p>
      <p className="mt-3 text-sm leading-relaxed text-cream/65">{label}</p>
    </div>
  );
}
