import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Market Intelligence — K-Food · 멕시코 시장 · FIFA 2026",
  description:
    "K-Food 수출 $13.62B, 멕시코 외식시장 $157B(2031) 전망, FIFA 2026 몬테레이, 몬테레이 구매력까지 — KOBIS GLOBAL의 멕시코 시장 진출 인텔리전스.",
};

const KFOOD = [
  { v: "$1.5B", l: "라면 수출 첫 돌파 (+21.9%)" },
  { v: "$10B+", l: "농식품 단일 수출 첫 돌파 · 10년 연속 증가" },
  { v: "$21B", l: "2030년 K-Food+ 수출 목표" },
];

const MX_ROWS: [string, string][] = [
  ["시장 규모 (2026)", "약 $104B"],
  ["시장 규모 (2031 전망)", "$157.26B"],
  ["연평균 성장률 (CAGR)", "8.58%"],
  ["QSR(퀵서비스) 점유율 (2025)", "55.45%"],
  ["배달 성장률 (CAGR)", "12.71%"],
];

const MATCHES: [string, string][] = [
  ["6월 14일", "UEFA 플레이오프 B 승자 vs 튀니지"],
  ["6월 20일", "일본 vs 튀니지"],
  ["6월 22일", "남아공 vs 대한민국 (A조 최종전)"],
  ["6월 29일", "32강 토너먼트"],
];

const INSIGHTS = [
  { d: "2026.06 · Market", t: "K-Food 수출 $13.62B의 의미 — 멕시코가 다음이다", e: "10년 연속 최고치를 경신한 K-Food 수출. 한국 식품기업이 멕시코·브라질을 전략 우선 시장으로 지정한 배경을 분석합니다." },
  { d: "2026.06 · Strategy", t: "FIFA 2026 × K-Culture — 지금이 입점 타이밍인 이유", e: "대한민국 6/22 몬테레이 경기, Parque Fundidora Fan Festival 39일. K-Pop·K-Food·K-Sports 교차 마케팅 기회." },
  { d: "2026.06 · Foodservice", t: "QSR 55%의 멕시코 — 한식 퀵서비스의 기회", e: "퀵서비스가 외식시장의 절반 이상을 차지하는 멕시코에서 한식 QSR의 포지셔닝을 살펴봅니다." },
  { d: "2026.06 · Consumer", t: "몬테레이 구매력과 프리미엄 외식", e: "멕시코 1인당 최부유 도시 몬테레이의 소비 시장과 BBQ 뷔페 타깃 적합성." },
];

const SOURCES = [
  { label: "Mordor Intelligence — Mexico Foodservice Market", href: "https://www.mordorintelligence.com/industry-reports/mexico-foodservice-market" },
  { label: "The Korea Herald — K-food exports record high", href: "https://www.koreaherald.com/article/10653707" },
  { label: "FIFA — Fan Festival Monterrey 2026", href: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/fifa-fan-festival/monterrey" },
];

export default function MarketPage() {
  return (
    <>
      <PageHero
        crumb="Market"
        eyebrow="Market Intelligence"
        title={
          <>
            왜 멕시코인가,
            <br />
            <span className="text-gradient">그리고 왜 지금인가.</span>
          </>
        }
        lede="K-Food 글로벌 모멘텀, 멕시코 외식시장의 성장, 그리고 FIFA 2026 — 시장과 타이밍이 동시에 열렸습니다. 검증 가능한 데이터로 정리했습니다."
      />

      <StatsSection withHeader={false} />

      {/* K-Food momentum */}
      <section className="container-x py-12 md:py-20">
        <SectionHeader
          eyebrow="K-Food Global Momentum"
          title={<>K-Food는 더 이상 <span className="text-gradient-warm">틈새가 아닙니다.</span></>}
          sub="K-Food+ 수출은 2025년 $13.62B(136.2억 달러)로 사상 최고치를 경신하며 10년 연속 증가했고, 한국 식품기업은 멕시코·브라질을 전략 우선 시장으로 지정했습니다."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {KFOOD.map((k, i) => (
            <Reveal key={k.l} delay={(i % 3) * 80}>
              <GlassCard className="h-full">
                <p className="text-3xl font-black tracking-tight text-gradient-warm">{k.v}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{k.l}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mexico foodservice table */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Mexico Foodservice"
            title={<>성장하는 시장,<br /><span className="text-gradient">퀵서비스가 절반 이상.</span></>}
            sub="멕시코 외식시장은 2031년 $157.26B 규모로 전망되며(CAGR 8.58%), 퀵서비스(QSR)가 시장의 절반 이상을 차지합니다. 배달은 두 자릿수 성장세입니다."
          />
          <Reveal>
            <div className="overflow-hidden rounded-2xl glass">
              <table className="w-full text-sm">
                <tbody>
                  {MX_ROWS.map(([k, v], i) => (
                    <tr key={k} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-5 py-4 text-cream/60">{k}</td>
                      <td className="px-5 py-4 text-right font-bold text-cream">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FIFA showcase */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-hairline">
              <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 30% 20%, rgba(182,255,0,0.28), transparent 55%), radial-gradient(120% 100% at 80% 80%, rgba(47,123,255,0.3), transparent 60%), #0a0a12" }} />
              <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
              <div className="absolute bottom-0 p-7">
                <p className="text-2xl font-black tracking-tight text-cream">FIFA 2026 · Monterrey</p>
                <p className="mt-1 text-sm text-cream/70">Parque Fundidora Fan Festival</p>
              </div>
            </div>
          </Reveal>
          <div>
            <p className="label-eyebrow mb-4">FIFA 2026 × Monterrey</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
              대한민국 대표팀이 <span className="text-gradient">몬테레이로</span> 옵니다.
            </h2>
            <p className="mt-5 leading-relaxed text-cream/65">
              대한민국 대표팀은 6월 22일 몬테레이 Estadio BBVA에서 경기를 치릅니다. KOBIS GLOBAL 1호점이 입점한 Parque Fundidora는 39일간(6/11–7/19) 열리는 공식 FIFA Fan Festival의 무대로, 200만+ 방문이 전망됩니다.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl glass">
              <table className="w-full text-sm">
                <tbody>
                  {MATCHES.map(([d, m], i) => (
                    <tr key={d} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="w-24 px-5 py-3 font-semibold text-cyan">{d}</td>
                      <td className="px-5 py-3 text-cream/75">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Monterrey purchasing power */}
      <section className="container-x py-12 md:py-20">
        <SectionHeader
          eyebrow="Monterrey — Consumer Market"
          title={<>멕시코에서 가장 <span className="text-gradient">부유한 시장.</span></>}
          sub="몬테레이는 1인당 구매력 기준 멕시코 최상위 도시입니다. 프리미엄 가족·단체 외식 수요가 강해 BBQ 뷔페 모델에 최적화된 시장입니다."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["~$35,500", "PPP 기준 1인당 GDP (전국 $18,800 대비)"],
            ["3위", "Nuevo León 주 · 전국 GDP 순위"],
            ["62,000+", "몬테레이 호텔 객실 (FIFA 대비)"],
          ].map(([v, l], i) => (
            <Reveal key={l} delay={(i % 3) * 80}>
              <GlassCard className="h-full">
                <p className="text-3xl font-black tracking-tight text-gradient">{v}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{l}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="container-x py-12 md:py-20">
        <SectionHeader eyebrow="Insights" title="멕시코 K-Food 시장 인사이트." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {INSIGHTS.map((a, i) => (
            <Reveal key={a.t} delay={(i % 2) * 80}>
              <GlassCard interactive className="h-full">
                <p className="text-[12px] text-cream/45">{a.d}</p>
                <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-cream">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{a.e}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="container-x py-12 md:py-16">
        <GlassCard>
          <p className="label-eyebrow mb-4">Sources & Disclaimer</p>
          <ul className="space-y-2 text-[13px]">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-cream/65 underline decoration-hairline underline-offset-4 transition hover:text-cyan">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] leading-relaxed text-cream/40">
            출처: 한국 농림축산식품부 · Mordor Intelligence · FIFA · 2026.01–06 기준. 시장 지표는 조사기관별 방법론에 따라 상이할 수 있으며 참고용이고, 개별 매장·사업 실적을 보장하지 않습니다. 환율(1 MXN ≈ 80 KRW)·IVA(16%) 별도.
          </p>
        </GlassCard>
      </section>

      <CTASection
        title={<>데이터가 가리키는 방향은<br /><span className="text-gradient">분명합니다.</span></>}
        primary={{ label: "파트너십 상담", href: "/contact" }}
        secondary={{ label: "투자 구조 보기", href: "/pricing" }}
      />
    </>
  );
}
