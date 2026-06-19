import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Brands — YUN'S SAMYONG FOOD · YUN'S BUFFET",
  description:
    "KOBIS GLOBAL의 K-Food 프랜차이즈 포트폴리오 — YUN'S SAMYONG FOOD(QSR), YUN'S BUFFET(한식 BBQ 무한리필), 2호점 확장, 복합 한식 허브, 이원화 공급망.",
};

function ToneBlock({ label, sub, gradient }: { label: string; sub: string; gradient: string }) {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 24, background: gradient }}>
      <div className="absolute bottom-0 p-8">
        <p className="t-h4">{label}</p>
        <p className="t-15 text-muted mt-1">{sub}</p>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  return (
    <>
      <PageHero
        crumb="Brands"
        eyebrow="Brands & Case Studies"
        title="두 개의 검증된 브랜드, 하나의 복합 한식 허브."
        lede="검증된 한식 브랜드를 멕시코 현지에 이식하고 운영합니다. 실제 운영 중인 매장의 구조와 확장 전략을 공개합니다."
      />

      {/* SAMYONG */}
      <section className="container-x py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ToneBlock label="YUN'S SAMYONG FOOD" sub="K-Food QSR · Monterrey 1호점" gradient="linear-gradient(135deg,#E7E2DA,#EFE7DA)" />
          </Reveal>
          <div>
            <GradientBadge>LIVE — 운영 중 · 2024.10 오픈</GradientBadge>
            <h2 className="t-h3 mt-5">YUN&apos;S SAMYONG FOOD</h2>
            <p className="t-15 text-muted mt-2">K-Food Quick Service</p>
            <p className="t-17 text-muted mt-5">
              라면·김밥·떡볶이·만두 중심의 한식 퀵서비스. 멕시코 1호점은 몬테레이 Plaza Puntacero(Parque Fundidora)에서 매장·포장·배달 3채널로 운영 중입니다. 100~200㎡ 규모, 원팩 시스템으로 일관된 맛을 구현합니다.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4">
              {[["3채널", "매장·포장·배달"], ["6,657+", "Instagram 팔로워"], ["35K+", "TikTok 단일 포스트"]].map(([v, l]) => (
                <div key={l} className="form-card p-4 text-center">
                  <p className="t-h6" style={{ fontWeight: 500 }}>
                    {v}
                  </p>
                  <p className="t-13 text-muted mt-1">{l}</p>
                </div>
              ))}
            </div>
            <p className="t-13 text-muted mt-3">※ SNS 수치는 게시 시점 기준이며 변동될 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* BUFFET */}
      <section className="container-x py-12 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-2">
            <Reveal>
              <ToneBlock label="YUN'S BUFFET" sub="Korean BBQ Buffet · 가라오케" gradient="linear-gradient(135deg,#E3DEE8,#DCE3E0)" />
            </Reveal>
          </div>
          <div className="lg:order-1">
            <GradientBadge>운영 중</GradientBadge>
            <h2 className="t-h3 mt-5">YUN&apos;S BUFFET</h2>
            <p className="t-15 text-muted mt-2">Korean BBQ Buffet</p>
            <p className="t-17 text-muted mt-5">
              한국식 고기구이 무한리필 + 가라오케 룸. 테이블 직화구이와 전용 환기 시스템을 갖춘 200~300㎡ 규모로, 프리미엄 가족·단체 상권에 최적화되어 있습니다. YUN&apos;S SAMYONG FOOD와 동일 상권(Plaza Puntacero)에서 시너지를 만듭니다.
            </p>
            <p className="t-24 mt-6" style={{ fontWeight: 500 }}>
              “Una experiencia que despierta tus sentidos.”
            </p>
          </div>
        </div>
      </section>

      {/* Hub */}
      <section className="container-x py-16 md:py-24">
        <div className="mb-14">
          <SectionHeader eyebrow="Expansion & Hub" title="한 매장에서 멈추지 않는, 복합 한식 허브 전략." max={760} />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["BBQ 뷔페 2호점", "확장 · 공사 진행 중", "후보지 검토 완료, 공사 진행 중. 동일 상권 교차 방문 시너지 구조."],
            ["교차 방문 시너지", "Cross-Visit", "QSR 방문객이 BBQ 뷔페로, 뷔페 고객이 QSR로 — 상권 내 체류·재방문 극대화."],
            ["브랜드 인지도", "Awareness", "동일 상권 복수 브랜드 노출로 인지도와 신뢰를 빠르게 축적."],
          ].map(([t, tag, d]) => (
            <Reveal key={t}>
              <div className="form-card p-8">
                <GradientBadge>{tag}</GradientBadge>
                <h3 className="t-24 mt-5" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-15 text-muted mt-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Supply chain */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ToneBlock label="Dual Supply Chain" sub="Korea → Mexico" gradient="linear-gradient(135deg,#DCE3E0,#E0E6EC)" />
          </Reveal>
          <div>
            <GradientBadge>Trading & Supply</GradientBadge>
            <h2 className="t-h3 mt-5">이원화 공급망</h2>
            <p className="t-17 text-muted mt-5">
              핵심 소스·원자재를 한국 본사와 검증된 현지 유통망으로 이원화 공급합니다. 2025년 들어 한국/중국발 멕시코 서안 직항 해상 노선이 신설되며 니어쇼어링 흐름이 강화되어, 공급 안정성과 원가·환율 리스크 분산에 유리한 환경이 형성되고 있습니다.
            </p>
            <p className="t-13 text-muted mt-4">※ 물류 동향은 공개 보도 기준이며, 노선·조건은 변동될 수 있습니다.</p>
          </div>
        </div>
      </section>

      <CTASection
        title="브랜드를 보셨다면, 다음은 투자 구조입니다."
        primary={{ label: "투자 패키지 보기", href: "/pricing" }}
        secondary={{ label: "파트너십 상담", href: "/contact" }}
      />
    </>
  );
}
