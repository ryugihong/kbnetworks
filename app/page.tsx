import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { BusinessAreasSection } from "@/components/sections/BusinessAreasSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";

const BRAND_TEASERS = [
  { name: "YUN'S SAMYONG FOOD", tag: "K-Food QSR", desc: "라면·김밥·떡볶이 중심 퀵서비스. 몬테레이 1호점 운영 중 · 3채널.", accent: "text-orange" },
  { name: "YUN'S BUFFET", tag: "Korean BBQ Buffet", desc: "한국식 고기구이 무한리필 + 가라오케. 프리미엄 가족·단체 상권.", accent: "text-cyan" },
  { name: "BBQ 뷔페 2호점", tag: "확장 · 공사 진행 중", desc: "동일 상권 교차 방문 시너지. 복합 한식 허브 구조.", accent: "text-lime" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BusinessAreasSection />

      <div className="border-y border-hairline bg-white/[0.015]">
        <StatsSection />
      </div>

      {/* Brands teaser */}
      <section className="container-x py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Brands"
            title={
              <>
                두 개의 검증된 브랜드,
                <br />
                <span className="text-gradient-warm">하나의 복합 한식 허브.</span>
              </>
            }
          />
          <GradientButton href="/brands" variant="ghost">
            전체 브랜드 보기 →
          </GradientButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BRAND_TEASERS.map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 80}>
              <GlassCard interactive className="h-full">
                <GradientBadge>{b.tag}</GradientBadge>
                <h3 className={`mt-5 text-lg font-bold tracking-tight ${b.accent}`}>{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{b.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About / platform teaser */}
      <section className="container-x py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Why KOBIS GLOBAL"
              title={
                <>
                  검증된 시스템이 먼저,
                  <br />
                  <span className="text-gradient">좋은 메뉴는 그다음.</span>
                </>
              }
              sub="멕시코에서 브랜드가 오래 살아남으려면 레시피보다 인프라가 중요합니다. 한국 본사의 시스템과 멕시코 현지 실행력을 결합해, 파트너가 첫날부터 일관된 품질을 구현하도록 지원합니다."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <GradientButton href="/about" variant="secondary">
                회사 소개 보기
              </GradientButton>
              <GradientButton href="/market" variant="ghost">
                시장 인텔리전스 →
              </GradientButton>
            </div>
          </div>
          <Reveal>
            <GlassCard className="border-gradient-top">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/5">
                {[
                  ["원팩 레시피", "초보자도 동일한 맛"],
                  ["이원화 교육", "본사 + 현장 OJT"],
                  ["이원화 공급망", "한국 + 현지"],
                  ["보호 상권", "영업권 보호"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-base/40 p-6">
                    <p className="text-sm font-bold text-cream">{k}</p>
                    <p className="mt-1 text-[13px] text-cream/55">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-cream/55">
                단일 매장이 아니라, 검증된 운영 인프라를 드립니다 — 상권·공급망·교육·품질관리까지.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Process teaser */}
      <div className="border-y border-hairline bg-white/[0.015]">
        <ProcessSection limit={3} />
        <div className="container-x -mt-8 pb-20">
          <Link href="/process" className="text-sm font-semibold text-cyan transition hover:text-cyan/80">
            전체 6단계 프로세스 보기 →
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
}
