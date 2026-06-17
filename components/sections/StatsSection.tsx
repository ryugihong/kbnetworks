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
        <div className="mb-12">
          <SectionHeader eyebrow="Market Proof" title="시장과 타이밍이 동시에 열렸습니다" max={760} />
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 70}>
            <StatCard value={s.value} label={s.label} index={String(i + 1).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
      <p className="t-13 text-muted mt-6" style={{ maxWidth: 900 }}>
        {STATS_SOURCE}
      </p>
    </section>
  );
}
