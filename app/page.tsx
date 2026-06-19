import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { BusinessAreasSection } from "@/components/sections/BusinessAreasSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { PricingCard } from "@/components/ui/PricingCard";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { PRICING_PLANS, PRICING_DISCLAIMER } from "@/lib/pricing";
import { FAQS } from "@/lib/faqs";

const BRANDS = [
  { title: "YUN'S SAMYONG FOOD", tag: "K-Food QSR · Live", desc: "라면·김밥·떡볶이 중심 퀵서비스. 몬테레이 1호점 운영 중.", tone: "#E7E2DA" },
  { title: "YUN'S BUFFET", tag: "Korean BBQ Buffet", desc: "한국식 고기구이 무한리필 + 가라오케. 프리미엄 가족·단체 상권.", tone: "#E3DEE8" },
  { title: "BBQ 뷔페 2호점", tag: "확장 · 공사 진행 중", desc: "동일 상권 교차 방문 시너지. 복합 한식 허브 구조.", tone: "#DCE3E0" },
  { title: "복합 한식 허브", tag: "Hub Strategy", desc: "QSR + BBQ 뷔페 동일 상권 배치로 인지도·객단가 극대화.", tone: "#E0E6EC" },
];

const SIGNALS = [
  { q: "K-Food+ 수출은 2025년 $13.62B로 사상 최고치를 경신하며 10년 연속 증가했습니다.", src: "한국 농림축산식품부", tone: "#E7E2DA" },
  { q: "멕시코 외식시장은 2031년 $157.26B 규모로 전망되며, 퀵서비스(QSR)가 시장의 55% 이상을 차지합니다.", src: "Mordor Intelligence", tone: "#DCE3E0" },
  { q: "대한민국 대표팀은 6/22 몬테레이에서 경기하고, Parque Fundidora는 39일 FIFA Fan Festival의 무대입니다.", src: "FIFA · 2026", tone: "#E3DEE8" },
];

const WHY = [
  { t: "검증된 시스템", d: "원팩 레시피·이원화 교육·QSC 품질관리로 첫날부터 일관된 품질." },
  { t: "현지 실행력", d: "상권·인허가·공사·운영을 본사 매뉴얼 기반으로 통합 관리." },
];

const INSIGHTS = [
  { title: "K-Food 수출 $13.62B의 의미 — 멕시코가 다음이다", cat: "Market", tone: "#E7E2DA" },
  { title: "FIFA 2026 × K-Culture — 지금이 입점 타이밍인 이유", cat: "Strategy", tone: "#DCE3E0" },
  { title: "QSR 55%의 멕시코 — 한식 퀵서비스의 기회", cat: "Foodservice", tone: "#E3DEE8" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Capability marquee */}
      <section className="py-12" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container-x">
          <p className="t-13 text-muted mb-8" style={{ letterSpacing: ".04em" }}>
            KOREA → MEXICO · ONE EXECUTION PLATFORM
          </p>
        </div>
        <Marquee
          items={["Franchise Operation", "Real Estate Development", "Project Management", "Trading", "Global Partnership", "Mexico Market Entry"]}
          itemClassName="t-h6"
        />
      </section>

      {/* Intro */}
      <section className="container-x py-24 text-center md:py-28">
        <Reveal className="flex flex-col items-center gap-10">
          <h2 className="t-h3" style={{ maxWidth: 1000 }}>
            KOBIS GLOBAL은 한국의 검증된 브랜드와 시스템을, 멕시코 현지의 실행력으로 완성하는 비즈니스 실행 플랫폼입니다.
          </h2>
          <GradientButton href="/about">회사 소개</GradientButton>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["검증된 시스템", "현지 실행력", "장기 동반 성장"].map((p) => (
              <span key={p} className="pill t-15" style={{ textTransform: "none", letterSpacing: 0 }}>
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <StatsSection />

      {/* Brands / Work */}
      <section className="container-x py-24 md:py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Selected work" title="검증된 브랜드, 또렷한 결과" max={620} />
          <GradientButton href="/brands" variant="ghost" arrow={false}>
            전체 브랜드 →
          </GradientButton>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {BRANDS.map((b) => (
            <Reveal key={b.title}>
              <BusinessCard title={b.title} tag={b.tag} desc={b.desc} tone={b.tone} href="/brands" />
            </Reveal>
          ))}
        </div>
      </section>

      <BusinessAreasSection />

      {/* Market signals (testimonials-style, sourced) */}
      <section className="container-x py-24 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader eyebrow="Market signals" title="숫자가 말하는 타이밍" max={420} />
          </div>
          <div className="flex flex-col gap-6">
            {SIGNALS.map((s) => (
              <Reveal key={s.src}>
                <figure className="flex flex-col gap-8 p-9" style={{ background: s.tone, borderRadius: 24 }}>
                  <span className="t-h4" aria-hidden="true">“</span>
                  <blockquote className="t-29">{s.q}</blockquote>
                  <figcaption className="t-15 text-muted">— {s.src}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="t-13 text-muted mt-8" style={{ maxWidth: 900 }}>
          시장 지표는 조사기관별 방법론에 따라 상이할 수 있으며 참고용이고, 개별 매장·사업 실적을 보장하지 않습니다.
        </p>
      </section>

      <ProcessSection />

      {/* Pricing */}
      <section className="container-x py-24 md:py-28">
        <div className="mb-14">
          <SectionHeader eyebrow="Pricing" title="명확한 All-in 가맹 패키지" align="center" max={700} />
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Reveal key={plan.name} className="h-full">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
        <p className="t-13 text-muted mt-8" style={{ maxWidth: 1000 }}>
          {PRICING_DISCLAIMER}
        </p>
      </section>

      {/* About teaser */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeader eyebrow="Why KOBIS GLOBAL" title="검증된 시스템이 먼저, 좋은 메뉴는 그다음." max={480} />
            <p className="t-20 text-muted" style={{ maxWidth: 480 }}>
              멕시코에서 브랜드가 오래 살아남으려면 레시피보다 인프라가 중요합니다. 한국 본사의 시스템과 멕시코 현지 실행력을 결합해, 파트너가 첫날부터 일관된 품질을 구현하도록 지원합니다.
            </p>
            <GradientButton href="/about">회사 소개 보기</GradientButton>
          </div>
          <div style={{ aspectRatio: "4/5", borderRadius: 24, background: "linear-gradient(135deg,#E7E2DA,#DCE3E0)" }} aria-hidden="true" />
        </div>
      </section>

      {/* Why us bento */}
      <section className="container-x py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="on-dark flex h-full min-h-[420px] flex-col justify-between block-dark p-9" style={{ borderRadius: 24 }}>
              <span className="text-3xl" aria-hidden="true">◎</span>
              <div>
                <h3 className="t-h5">전략이 먼저, 언제나.</h3>
                <p className="t-17 text-muted mt-4" style={{ maxWidth: 360 }}>
                  모든 결정은 상업적 목표에 연결됩니다. 보여주기식 디자인이 아니라, 매장의 생존과 성장을 위한 구조를 설계합니다.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {WHY.map((w, i) => (
              <Reveal key={w.t} className="flex-1">
                <div className="flex h-full flex-col gap-4 p-9" style={{ flex: 1, borderRadius: 24, background: i === 0 ? "var(--white)" : "#E7E2DA" }}>
                  <h3 className="t-h6" style={{ fontWeight: 500 }}>
                    {w.t}
                  </h3>
                  <p className="t-17 text-muted">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <section className="overflow-hidden py-10 on-dark block-dark" style={{ margin: "0 12px", borderRadius: 28 }}>
        <Marquee
          fast
          items={["Franchise", "Real Estate", "Project Mgmt", "Trading", "Partnership", "Market Entry", "FIFA 2026", "Monterrey"]}
          itemClassName="t-h4"
          sep="✦"
        />
      </section>

      {/* Insights */}
      <section className="container-x py-24 md:py-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Insights" title="최신 인사이트" max={560} />
          <GradientButton href="/market" variant="ghost" arrow={false}>
            전체 보기 →
          </GradientButton>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {INSIGHTS.map((p) => (
            <Reveal key={p.title}>
              <Link href="/market" className="block">
                <div style={{ aspectRatio: "16/11", borderRadius: 20, background: p.tone }} aria-hidden="true" />
                <div className="t-13 text-muted mt-5 flex items-center gap-3">
                  <span className="pill t-13">{p.cat}</span>
                  <span>2026.06</span>
                </div>
                <h3 className="t-h3blog mt-3" style={{ fontWeight: 500 }}>
                  {p.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FAQSection items={FAQS.slice(0, 6)} />
    </>
  );
}
