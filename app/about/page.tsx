import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { ACCENTS, cn } from "@/lib/accents";
import type { AccentKey } from "@/lib/site-data";
import { SITE, CONTACT, REGIONS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About — 한국–멕시코 실행 파트너",
  description:
    "KOBIS GLOBAL SA DE CV와 KBNETWORKS는 한국 본사의 시스템과 멕시코 현지 실행력을 결합한 비즈니스 실행 플랫폼입니다. 미션, 4대 운영 원칙, 회사 정보를 소개합니다.",
};

const PILLARS: { no: string; title: string; en: string; desc: string; accent: AccentKey }[] = [
  { no: "01", title: "레시피 & R&D", en: "Recipe & R&D", accent: "orange", desc: "복잡한 조리를 최소화한 원팩 시스템으로 초보 인력도 매장마다 동일한 맛을 구현합니다. 본사가 현지 입맛 데이터에 맞춰 조리 매뉴얼과 소스 스펙을 지속 업데이트합니다." },
  { no: "02", title: "이원화 교육", en: "Dual-Track Training", accent: "cyan", desc: "본사 집중 실무 교육과 현장 OJT를 이원화해 점주·핵심 직원이 오픈 전 조리·위생·서비스·POS 운영을 완성합니다. 온라인 자료로 재교육이 매장 내에서 반복 가능합니다." },
  { no: "03", title: "이원화 공급망", en: "Dual Supply Chain", accent: "lime", desc: "핵심 소스·원자재를 한국 본사와 검증된 현지 유통망으로 이원화 공급합니다. 한–멕 직항 해상 노선 확대와 니어쇼어링을 활용해 원가·공급 리스크를 줄입니다." },
  { no: "04", title: "보호 상권", en: "Protected Area", accent: "violet", desc: "상권 중복 방지 기준으로 파트너의 영업권을 보호합니다. 입지 검토는 기준 체크리스트(배달 인프라·경쟁점·임대조건·유동인구)로 함께 진행하며, 거점 밀도와 시너지를 우선합니다." },
];

const BENEFITS = [
  { title: "검증된 브랜드 시스템", desc: "운영 매뉴얼·원팩 레시피·위생 기준 — 초보자도 동일 퀄리티.", value: "285M₩+", label: "YUN'S SAMYONG FOOD 기준 개설비" },
  { title: "본사 전방위 지원", desc: "마케팅·IT/POS·교육·공급망·QSC — 6개 영역 통합 지원.", value: "24/7", label: "본사 서포트 & 운영 관리" },
  { title: "빠른 오픈 프로세스", desc: "상담에서 그랜드 오픈까지 체계적 6단계 로드맵.", value: "10–14wk", label: "상담 → 그랜드 오픈 평균" },
];

const FACTS: [string, string][] = [
  ["법인 (Mexico)", SITE.legal],
  ["한국 파트너", "KBNETWORKS (한국지사 · 본사 시스템 연계)"],
  ["사업 영역", "프랜차이즈 · 부동산 · PM · 무역 · 파트너십 · 시장진출"],
  ["운영 브랜드", "YUN'S SAMYONG FOOD · YUN'S BUFFET"],
  ["운영 거점", CONTACT.address],
  ["우선 검토 지역", REGIONS.join(" · ")],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About KOBIS GLOBAL"
        title={
          <>
            우리는 매장이 아니라,
            <br />
            <span className="text-gradient">오래 살아남는 구조</span>를 만듭니다.
          </>
        }
        lede="KOBIS GLOBAL은 검증된 브랜드와 한국 본사의 운영 시스템을 멕시코 시장에 이식하는 한국–멕시코 비즈니스 실행 플랫폼입니다. 좋은 메뉴는 출발점일 뿐 — 매장의 생존을 결정하는 인프라를 파트너와 함께 설계합니다."
      />

      <section className="container-x py-20 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xl font-medium leading-relaxed text-cream">
              멕시코에서 한식 브랜드가 실패하는 진짜 이유는 메뉴가 아니라 시스템입니다.
            </p>
            <p className="leading-relaxed text-cream/65">
              화제가 된 메뉴 하나로 문을 여는 매장은 많지만, 일관된 맛·안정적 공급·검증된 운영 기준이 없으면 오래가지 못합니다.{" "}
              <span className="font-semibold text-cream">{SITE.legal}</span>(멕시코 법인)와 한국 파트너{" "}
              <span className="font-semibold text-cream">{SITE.korea}</span>는 바로 이 간극을 메우기 위해 설립됐습니다.
            </p>
            <p className="leading-relaxed text-cream/65">
              한국 본사의 검증된 레시피와 원팩 조리 시스템, 이원화된 교육·공급망, 그리고 멕시코 현지 운영 경험을 하나로 묶어 — 프랜차이즈를 처음 시작하는 파트너도 첫날부터 본사 수준의 품질을 구현하도록 지원합니다.
            </p>
            <p className="leading-relaxed text-cream/65">
              우리는 가맹점을 &lsquo;판매&rsquo;하지 않습니다. 함께 운영할 파트너를 찾고, 그 매장이 자생할 수 있는 구조를 끝까지 함께 만듭니다.
            </p>
          </div>
          <Reveal>
            <GlassCard className="border-gradient-top">
              <p className="label-eyebrow mb-3">The market we build for</p>
              <p className="text-lg font-bold text-cream">몬테레이 — 멕시코에서 가장 부유한 시장</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                몬테레이는 1인당 구매력 기준 멕시코 최상위 도시로, 프리미엄 가족·단체 외식 수요가 강한 시장입니다. KOBIS GLOBAL은 이 거점을 중심으로 CDMX·과달라하라까지 단계적 진입을 설계합니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <span key={r} className="rounded-full border border-hairline px-3 py-1 text-[12px] text-cream/60">
                    {r}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-6 md:py-10">
        <p className="mx-auto max-w-3xl text-center text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl md:text-[2.2rem]">
          <span className="text-cream/80">&ldquo;We help Mexico&apos;s next generation of operators build </span>
          <span className="text-gradient">lasting businesses</span>
          <span className="text-cream/80"> around Korea&apos;s most dynamic food culture.&rdquo;</span>
        </p>
      </section>

      <section className="container-x py-20 md:py-24">
        <SectionHeader
          eyebrow="Why KOBIS GLOBAL — 4대 운영 원칙"
          title={
            <>
              단일 매장이 아니라,
              <br />
              <span className="text-gradient">검증된 운영 인프라</span>를 드립니다.
            </>
          }
          sub="한국 본사의 표준과 멕시코 현지화가 만나는 지점에서, 매장의 생존 가능성이 결정됩니다."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => {
            const a = ACCENTS[p.accent];
            return (
              <Reveal key={p.no} delay={(i % 2) * 80}>
                <GlassCard interactive className="h-full">
                  <p className={cn("text-sm font-bold", a.text)}>{p.no}</p>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-cream">{p.title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-cream/40">{p.en}</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">{p.desc}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80}>
              <GlassCard className="h-full">
                <h3 className="text-base font-bold text-cream">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{b.desc}</p>
                <p className="mt-5 text-3xl font-black tracking-tight text-gradient">{b.value}</p>
                <p className="mt-1 text-[12px] text-cream/45">{b.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-24">
        <SectionHeader eyebrow="Leadership & Company" title="신뢰는 약속이 아니라 구조에서 나옵니다." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <GlassCard className="border-l-2 border-l-cyan">
            <p className="label-eyebrow mb-4">From the team</p>
            <p className="text-lg italic leading-relaxed text-cream">
              &ldquo;멕시코에서 한식 브랜드가 오래 살아남으려면, 좋은 메뉴보다 제대로 된 시스템이 먼저입니다. 저희는 상권·공급망·교육·운영 기준 — 매장의 성패를 가르는 모든 요소를 파트너와 함께 점검합니다.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-cyan">
                {CONTACT.partnership.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-cream">{CONTACT.partnership.name}</p>
                <p className="text-[13px] text-cream/55">{CONTACT.partnership.role}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <dl className="divide-y divide-hairline">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-44 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-cream/40">{k}</dt>
                  <dd className="text-sm text-cream/80">{v}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </div>
      </section>

      <CTASection
        title={
          <>
            회사가 궁금하셨다면,
            <br />
            <span className="text-gradient">다음은 브랜드와 시장</span>입니다.
          </>
        }
        sub="운영 중인 브랜드의 실제 케이스와, 지금이 왜 입점 타이밍인지 보여드립니다."
        primary={{ label: "브랜드 케이스 보기", href: "/brands" }}
        secondary={{ label: "시장 인텔리전스", href: "/market" }}
      />
    </>
  );
}
