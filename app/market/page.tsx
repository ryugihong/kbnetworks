import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Market Intelligence — K-Food · 멕시코 시장 · FIFA 2026",
  description:
    "K-Food 수출 $13.62B, 멕시코 외식시장 $157B(2031) 전망, FIFA 2026 몬테레이, 몬테레이 구매력까지 — KOBIS GLOBAL의 멕시코 시장 진출 인텔리전스.",
};

const KFOOD: [string, string][] = [
  ["$1.5B", "라면 수출 첫 돌파 (+21.9%)"],
  ["$10B+", "농식품 단일 수출 첫 돌파 · 10년 연속 증가"],
  ["$21B", "2030년 K-Food+ 수출 목표"],
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

const MONTERREY: [string, string][] = [
  ["~$35,500", "PPP 기준 1인당 GDP (전국 $18,800 대비)"],
  ["3위", "Nuevo León 주 · 전국 GDP 순위"],
  ["62,000+", "몬테레이 호텔 객실 (FIFA 대비)"],
];

const INSIGHTS: [string, string, string][] = [
  ["Market", "K-Food 수출 $13.62B의 의미 — 멕시코가 다음이다", "한국 식품기업이 멕시코·브라질을 전략 우선 시장으로 지정한 배경을 분석합니다."],
  ["Strategy", "FIFA 2026 × K-Culture — 입점 타이밍", "대한민국 6/22 몬테레이 경기, Fan Festival 39일. K-Pop·K-Food·K-Sports 교차 마케팅."],
  ["Foodservice", "QSR 55%의 멕시코 — 한식 퀵서비스의 기회", "퀵서비스가 외식시장의 절반 이상을 차지하는 멕시코의 한식 QSR 포지셔닝."],
];

const SOURCES = [
  { label: "Mordor Intelligence — Mexico Foodservice Market", href: "https://www.mordorintelligence.com/industry-reports/mexico-foodservice-market" },
  { label: "The Korea Herald — K-food exports record high", href: "https://www.koreaherald.com/article/10653707" },
  { label: "FIFA — Fan Festival Monterrey 2026", href: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/fifa-fan-festival/monterrey" },
];

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="form-card overflow-hidden">
      <table className="w-full">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={k} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
              <td className="t-15 text-muted px-6 py-4">{k}</td>
              <td className="t-17 px-6 py-4 text-right" style={{ fontWeight: 500 }}>
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MarketPage() {
  return (
    <>
      <PageHero
        crumb="Market"
        eyebrow="Market Intelligence"
        title="왜 멕시코인가, 그리고 왜 지금인가."
        lede="K-Food 글로벌 모멘텀, 멕시코 외식시장의 성장, 그리고 FIFA 2026 — 시장과 타이밍이 동시에 열렸습니다. 검증 가능한 데이터로 정리했습니다."
      />

      <StatsSection withHeader={false} />

      <section className="container-x py-16 md:py-20">
        <div className="mb-10">
          <SectionHeader
            eyebrow="K-Food Global Momentum"
            title="K-Food는 더 이상 틈새가 아닙니다."
            sub="K-Food+ 수출은 2025년 $13.62B(136.2억 달러)로 사상 최고치를 경신하며 10년 연속 증가했고, 한국 식품기업은 멕시코·브라질을 전략 우선 시장으로 지정했습니다."
            max={760}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {KFOOD.map(([v, l]) => (
            <Reveal key={l}>
              <div className="form-card p-8">
                <p className="t-h4">{v}</p>
                <p className="t-17 text-muted mt-2">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Mexico Foodservice"
            title="성장하는 시장, 퀵서비스가 절반 이상."
            sub="멕시코 외식시장은 2031년 $157.26B 규모로 전망되며(CAGR 8.58%), 퀵서비스(QSR)가 시장의 절반 이상을 차지합니다."
            max={460}
          />
          <Reveal>
            <Table rows={MX_ROWS} />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 24, background: "linear-gradient(135deg,#E7E2DA,#E0E6EC)" }}>
              <div className="absolute bottom-0 p-8">
                <p className="t-h4">FIFA 2026 · Monterrey</p>
                <p className="t-15 text-muted mt-1">Parque Fundidora Fan Festival</p>
              </div>
            </div>
          </Reveal>
          <div>
            <GradientBadge>FIFA 2026 × Monterrey</GradientBadge>
            <h2 className="t-h3 mt-5">대한민국 대표팀이 몬테레이로 옵니다.</h2>
            <p className="t-17 text-muted mt-5">
              대한민국 대표팀은 6월 22일 몬테레이 Estadio BBVA에서 경기를 치릅니다. KOBIS GLOBAL 1호점이 입점한 Parque Fundidora는 39일간(6/11–7/19) 열리는 공식 FIFA Fan Festival의 무대로, 200만+ 방문이 전망됩니다.
            </p>
            <div className="mt-6">
              <Table rows={MATCHES} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="mb-10">
          <SectionHeader
            eyebrow="Monterrey — Consumer Market"
            title="멕시코에서 가장 부유한 시장."
            sub="몬테레이는 1인당 구매력 기준 멕시코 최상위 도시입니다. 프리미엄 가족·단체 외식 수요가 강해 BBQ 뷔페 모델에 최적화된 시장입니다."
            max={680}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {MONTERREY.map(([v, l]) => (
            <Reveal key={l}>
              <div className="form-card p-8">
                <p className="t-h4">{v}</p>
                <p className="t-17 text-muted mt-2">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="mb-10">
          <SectionHeader eyebrow="Insights" title="멕시코 K-Food 시장 인사이트." max={560} />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {INSIGHTS.map(([cat, t, e]) => (
            <Reveal key={t}>
              <div className="form-card p-8">
                <span className="pill t-13">{cat}</span>
                <h3 className="t-h3blog mt-4" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-15 text-muted mt-3">{e}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="form-card p-8">
          <p className="t-eyebrow text-muted mb-4">Sources & Disclaimer</p>
          <ul className="space-y-2 t-15">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-4 hover:opacity-70">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-13 text-muted mt-5" style={{ maxWidth: 1000 }}>
            출처: 한국 농림축산식품부 · Mordor Intelligence · FIFA · 2026.01–06 기준. 시장 지표는 조사기관별 방법론에 따라 상이할 수 있으며 참고용이고, 개별 매장·사업 실적을 보장하지 않습니다. 환율(1 MXN ≈ 80 KRW)·IVA(16%) 별도.
          </p>
        </div>
      </section>

      <CTASection
        title="데이터가 가리키는 방향은 분명합니다."
        primary={{ label: "파트너십 상담", href: "/contact" }}
        secondary={{ label: "투자 구조 보기", href: "/pricing" }}
      />
    </>
  );
}
