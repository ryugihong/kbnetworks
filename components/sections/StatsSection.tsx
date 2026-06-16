import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/ui/Reveal";
import { STATS, STATS_SOURCE } from "@/lib/site-data";

type Props = {
  withHeader?: boolean;
};

export function StatsSection({ withHeader = true }: Props) {
  return (
    <section className="container-x py-20 md:py-24">
      {withHeader && (
        <SectionHeader
          eyebrow="Market Proof — 2025–2026"
          title={
            <>
              시장과 타이밍이
              <br />
              <span className="text-gradient">동시에 열렸습니다.</span>
            </>
          }
        />
      )}
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${withHeader ? "mt-12" : ""}`}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 70}>
            <StatCard value={s.value} label={s.label} accent={s.accent} />
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-[12px] leading-relaxed text-cream/40">{STATS_SOURCE}</p>
    </section>
  );
}
