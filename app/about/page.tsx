import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SITE, CONTACT, REGIONS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About — 한국–멕시코 실행 파트너",
  description:
    "KOBIS GLOBAL SA DE CV와 KBNETWORKS는 한국 본사의 시스템과 멕시코 현지 실행력을 결합한 비즈니스 실행 플랫폼입니다. 미션, 4대 운영 원칙, 회사 정보를 소개합니다.",
};

const PILLARS: [string, string, string, string][] = [
  ["01", "레시피 & R&D", "Recipe & R&D", "복잡한 조리를 최소화한 원팩 시스템으로 초보 인력도 매장마다 동일한 맛을 구현합니다. 본사가 현지 입맛 데이터에 맞춰 매뉴얼과 소스 스펙을 지속 업데이트합니다."],
  ["02", "이원화 교육", "Dual-Track Training", "본사 집중 실무 교육과 현장 OJT를 이원화해 점주·핵심 직원이 오픈 전 조리·위생·서비스·POS 운영을 완성합니다. 온라인 자료로 재교육이 반복 가능합니다."],
  ["03", "이원화 공급망", "Dual Supply Chain", "핵심 소스·원자재를 한국 본사와 검증된 현지 유통망으로 이원화 공급합니다. 한–멕 직항 해상 노선 확대와 니어쇼어링을 활용해 원가·공급 리스크를 줄입니다."],
  ["04", "보호 상권", "Protected Area", "상권 중복 방지 기준으로 파트너의 영업권을 보호합니다. 입지 검토는 기준 체크리스트로 함께 진행하며, 거점 밀도와 시너지를 우선합니다."],
];

const BENEFITS: [string, string, string, string][] = [
  ["검증된 브랜드 시스템", "운영 매뉴얼·원팩 레시피·위생 기준 — 초보자도 동일 퀄리티.", "285M₩+", "YUN'S SAMYONG FOOD 기준 개설비"],
  ["본사 전방위 지원", "마케팅·IT/POS·교육·공급망·QSC — 6개 영역 통합 지원.", "24/7", "본사 서포트 & 운영 관리"],
  ["빠른 오픈 프로세스", "상담에서 그랜드 오픈까지 체계적 6단계 로드맵.", "10–14주", "상담 → 그랜드 오픈 평균"],
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
        title="우리는 매장이 아니라, 오래 살아남는 구조를 만듭니다."
        lede="KOBIS GLOBAL은 검증된 브랜드와 한국 본사의 운영 시스템을 멕시코 시장에 이식하는 한국–멕시코 비즈니스 실행 플랫폼입니다. 좋은 메뉴는 출발점일 뿐 — 매장의 생존을 결정하는 인프라를 파트너와 함께 설계합니다."
      />

      <section className="container-x py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="t-24" style={{ fontWeight: 500 }}>
              멕시코에서 한식 브랜드가 실패하는 진짜 이유는 메뉴가 아니라 시스템입니다.
            </p>
            <p className="t-17 text-muted">
              화제가 된 메뉴 하나로 문을 여는 매장은 많지만, 일관된 맛·안정적 공급·검증된 운영 기준이 없으면 오래가지 못합니다. <strong style={{ color: "var(--dark)" }}>{SITE.legal}</strong>(멕시코 법인)와 한국 파트너 <strong style={{ color: "var(--dark)" }}>{SITE.korea}</strong>는 바로 이 간극을 메우기 위해 설립됐습니다.
            </p>
            <p className="t-17 text-muted">
              한국 본사의 검증된 레시피와 원팩 조리 시스템, 이원화된 교육·공급망, 멕시코 현지 운영 경험을 하나로 묶어 — 프랜차이즈를 처음 시작하는 파트너도 첫날부터 본사 수준의 품질을 구현하도록 지원합니다. 우리는 가맹점을 &lsquo;판매&rsquo;하지 않습니다. 함께 운영할 파트너를 찾고, 그 매장이 자생할 수 있는 구조를 끝까지 함께 만듭니다.
            </p>
          </div>
          <Reveal>
            <div className="p-9" style={{ borderRadius: 24, background: "linear-gradient(135deg,#E7E2DA,#DCE3E0)", minHeight: 360 }}>
              <GradientBadge>The market we build for</GradientBadge>
              <p className="t-h5 mt-5">몬테레이 — 멕시코에서 가장 부유한 시장</p>
              <p className="t-17 text-muted mt-4" style={{ maxWidth: 420 }}>
                1인당 구매력 기준 멕시코 최상위 도시로, 프리미엄 가족·단체 외식 수요가 강한 시장입니다. KOBIS GLOBAL은 이 거점을 중심으로 CDMX·과달라하라까지 단계적 진입을 설계합니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-10 text-center">
        <p className="t-h3 mx-auto" style={{ maxWidth: 1000 }}>
          “We help Mexico&apos;s next generation of operators build lasting businesses around Korea&apos;s most dynamic food culture.”
        </p>
      </section>

      <section className="container-x py-20 md:py-24">
        <div className="mb-14">
          <SectionHeader eyebrow="Why KOBIS GLOBAL — 4대 운영 원칙" title="단일 매장이 아니라, 검증된 운영 인프라를 드립니다." max={820} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map(([no, t, en, d]) => (
            <Reveal key={no}>
              <div className="form-card p-8">
                <p className="t-15 text-muted">{no}</p>
                <h3 className="t-24 mt-3" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-13 text-muted">{en}</p>
                <p className="t-17 text-muted mt-3">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map(([t, d, v, l]) => (
            <Reveal key={t}>
              <div className="form-card p-8">
                <h3 className="t-24" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-15 text-muted mt-2">{d}</p>
                <p className="t-h4 mt-6">{v}</p>
                <p className="t-13 text-muted mt-1">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-24">
        <div className="mb-10">
          <SectionHeader eyebrow="Leadership & Company" title="신뢰는 약속이 아니라 구조에서 나옵니다." max={640} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-9" style={{ borderRadius: 24, background: "#E3DEE8" }}>
            <span className="t-h4" aria-hidden="true">“</span>
            <p className="t-24" style={{ fontWeight: 500 }}>
              멕시코에서 한식 브랜드가 오래 살아남으려면, 좋은 메뉴보다 제대로 된 시스템이 먼저입니다. 저희는 상권·공급망·교육·운영 기준 — 매장의 성패를 가르는 모든 요소를 파트너와 함께 점검합니다.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-paper" style={{ background: "#0E0E0E" }}>
                {CONTACT.partnership.initials}
              </span>
              <div>
                <p className="t-17 font-medium">{CONTACT.partnership.name}</p>
                <p className="t-15 text-muted">{CONTACT.partnership.role}</p>
              </div>
            </div>
          </div>
          <div className="form-card p-8">
            <dl>
              {FACTS.map(([k, v], i) => (
                <div
                  key={k}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}
                >
                  <dt className="t-13 text-muted" style={{ width: 160, flexShrink: 0 }}>
                    {k}
                  </dt>
                  <dd className="t-17">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        title="회사가 궁금하셨다면, 다음은 브랜드와 시장입니다."
        sub="운영 중인 브랜드의 실제 케이스와, 지금이 왜 입점 타이밍인지 보여드립니다."
        primary={{ label: "브랜드 케이스 보기", href: "/brands" }}
        secondary={{ label: "시장 인텔리전스", href: "/market" }}
      />
    </>
  );
}
