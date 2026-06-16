import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Brands — YUN'S SAMYONG FOOD · YUN'S BUFFET",
  description:
    "KOBIS GLOBAL의 K-Food 프랜차이즈 포트폴리오 — YUN'S SAMYONG FOOD(QSR), YUN'S BUFFET(한식 BBQ 무한리필), 2호점 확장, 복합 한식 허브, 이원화 공급망.",
};

function VisualPanel({ label, sub, gradient }: { label: string; sub: string; gradient: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-hairline">
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 p-7">
        <p className="text-2xl font-black tracking-tight text-cream">{label}</p>
        <p className="mt-1 text-sm text-cream/70">{sub}</p>
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
        title={
          <>
            두 개의 검증된 브랜드,
            <br />
            <span className="text-gradient-warm">하나의 복합 한식 허브.</span>
          </>
        }
        lede="검증된 한식 브랜드를 멕시코 현지에 이식하고 운영합니다. 실제 운영 중인 매장의 구조와 확장 전략을 공개합니다."
      />

      {/* SAMYONG */}
      <section className="container-x py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <VisualPanel
              label="YUN'S SAMYONG FOOD"
              sub="K-Food QSR · Monterrey 1호점"
              gradient="radial-gradient(120% 100% at 20% 20%, rgba(255,122,0,0.35), transparent 60%), linear-gradient(135deg, #1d1206, #0a0a12)"
            />
          </Reveal>
          <div>
            <GradientBadge dot>LIVE — 운영 중 · 2024.10 오픈</GradientBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">YUN&apos;S SAMYONG FOOD</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-orange">K-Food Quick Service</p>
            <p className="mt-5 leading-relaxed text-cream/65">
              라면·김밥·떡볶이·만두 중심의 한식 퀵서비스. 멕시코 1호점은 몬테레이 Plaza Puntacero(Parque Fundidora)에서 매장·포장·배달 3채널로 운영 중입니다. 100~200㎡ 규모, 원팩 시스템으로 일관된 맛을 구현합니다.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/5">
              {[
                ["3채널", "매장·포장·배달"],
                ["6,657+", "Instagram 팔로워"],
                ["35,000+", "TikTok 단일 포스트 좋아요"],
              ].map(([v, l]) => (
                <div key={l} className="bg-base/40 p-4 text-center">
                  <p className="text-xl font-black tracking-tight text-gradient-warm">{v}</p>
                  <p className="mt-1 text-[11px] leading-tight text-cream/55">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-cream/40">※ SNS 수치는 게시 시점 기준이며 변동될 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* BUFFET */}
      <section className="container-x py-12 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-2">
            <Reveal>
              <VisualPanel
                label="YUN'S BUFFET"
                sub="Korean BBQ Buffet · 가라오케"
                gradient="radial-gradient(120% 100% at 70% 30%, rgba(139,92,246,0.4), transparent 60%), linear-gradient(135deg, #150d20, #0a0a12)"
              />
            </Reveal>
          </div>
          <div className="lg:order-1">
            <GradientBadge dot>운영 중</GradientBadge>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">YUN&apos;S BUFFET</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-violet">Korean BBQ Buffet</p>
            <p className="mt-5 leading-relaxed text-cream/65">
              한국식 고기구이 무한리필 + 가라오케 룸. 테이블 직화구이와 전용 환기 시스템을 갖춘 200~300㎡ 규모로, 프리미엄 가족·단체 상권에 최적화되어 있습니다. YUN&apos;S SAMYONG FOOD와 동일 상권(Plaza Puntacero)에서 시너지를 만듭니다.
            </p>
            <p className="mt-5 text-lg font-medium italic text-cream/80">&ldquo;Una experiencia que despierta tus sentidos.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Expansion + Hub */}
      <section className="container-x py-20 md:py-24">
        <SectionHeader
          eyebrow="Expansion & Hub"
          title={
            <>
              한 매장에서 멈추지 않는,
              <br />
              <span className="text-gradient">복합 한식 허브 전략.</span>
            </>
          }
          sub="QSR과 BBQ 뷔페를 동일 상권에 배치해 교차 방문을 유도하고, 브랜드 인지도와 객단가 구성을 다양화합니다."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { t: "BBQ 뷔페 2호점", b: "확장 · 공사 진행 중", d: "후보지 검토 완료, 공사 진행 중. 동일 상권 교차 방문 시너지 구조." , accent: "text-lime" },
            { t: "교차 방문 시너지", b: "Cross-Visit", d: "QSR 방문객이 BBQ 뷔페로, 뷔페 고객이 QSR로 — 상권 내 체류·재방문 극대화.", accent: "text-cyan" },
            { t: "브랜드 인지도", b: "Awareness", d: "동일 상권 복수 브랜드 노출로 인지도와 신뢰를 빠르게 축적.", accent: "text-electric" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 80}>
              <GlassCard interactive className="h-full">
                <GradientBadge>{c.b}</GradientBadge>
                <h3 className={`mt-5 text-lg font-bold tracking-tight ${c.accent}`}>{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{c.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Supply chain */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <VisualPanel
              label="Dual Supply Chain"
              sub="Korea → Mexico"
              gradient="radial-gradient(120% 100% at 50% 30%, rgba(0,229,255,0.3), transparent 60%), linear-gradient(135deg, #0a1420, #0a0a12)"
            />
          </Reveal>
          <div>
            <p className="label-eyebrow mb-4">Trading & Supply</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">이원화 공급망</h2>
            <p className="mt-5 leading-relaxed text-cream/65">
              핵심 소스·원자재를 한국 본사와 검증된 현지 유통망으로 이원화 공급합니다. 2025년 들어 MSC·CMA CGM·OOCL 등 한국/중국발 멕시코 서안 직항 해상 노선이 신설되며 니어쇼어링 흐름이 강화되어, 공급 안정성과 원가·환율 리스크 분산에 유리한 환경이 형성되고 있습니다.
            </p>
            <p className="mt-4 text-[12px] text-cream/40">※ 물류 동향은 공개 보도 기준이며, 노선·조건은 변동될 수 있습니다.</p>
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            브랜드를 보셨다면,
            <br />
            <span className="text-gradient">다음은 투자 구조</span>입니다.
          </>
        }
        primary={{ label: "투자 패키지 보기", href: "/pricing" }}
        secondary={{ label: "파트너십 상담", href: "/contact" }}
      />
    </>
  );
}
