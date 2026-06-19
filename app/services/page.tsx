import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, serviceHref } from "@/lib/services";

export const metadata: Metadata = {
  title: { absolute: "KOBIS GLOBAL Services | 글로벌 비즈니스 개발 및 프로젝트 실행" },
  description:
    "KOBIS GLOBAL은 프랜차이즈, 글로벌 사업개발, 부동산 개발, 프로젝트 PM, 투자·금융 구조화, 무역 및 파트너십을 지원하는 글로벌 비즈니스 개발 회사입니다.",
};

const PORTFOLIO_DESC =
  "KOBIS GLOBAL의 서비스는 하나의 단일 업무가 아니라, 사업이 시장에 진입하고 확장되기 위해 필요한 핵심 기능을 연결하는 구조로 설계되어 있습니다. 브랜드 운영부터 해외 진출, 개발 프로젝트, 금융 구조, 현지 파트너십까지 각 영역은 독립적으로도 작동하지만, 필요에 따라 하나의 통합 사업 모델로 결합될 수 있습니다.";

const INTEGRATED_DESC =
  "KOBIS GLOBAL의 강점은 각 서비스를 따로 제공하는 데 있지 않습니다. 우리는 시장 조사, 사업성 검토, 파트너십 구축, 운영 모델 설계, 투자 구조 검토, 프로젝트 관리까지 사업화에 필요한 요소를 하나의 실행 체계로 연결합니다. 이를 통해 고객과 파트너는 아이디어 단계의 사업을 보다 명확하고 실행 가능한 형태로 발전시킬 수 있습니다.";

const AUDIENCE = [
  "해외 진출을 준비하는 한국 기업",
  "현지 파트너를 찾는 글로벌 브랜드",
  "가맹사업 확장을 준비하는 외식 브랜드",
  "개발 프로젝트를 추진하는 시행사 및 투자자",
  "프로젝트 금융 구조가 필요한 사업자",
  "무역 및 유통 파트너십이 필요한 기업",
];

function ArrowUpRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="KOBIS GLOBAL Services"
        title="사업을 기획하고, 시장을 연결하며, 실행 가능한 구조로 완성합니다"
        lede="KOBIS GLOBAL은 프랜차이즈 운영, 글로벌 사업개발, 부동산 개발, 프로젝트 시행 및 PM, 투자·금융 구조화, 무역 및 파트너십을 통합적으로 수행하는 글로벌 비즈니스 개발 회사입니다. 우리는 단순한 중개나 컨설팅을 넘어, 사업 아이디어가 실제 시장에서 작동할 수 있도록 기획, 구조화, 파트너십, 실행 관리까지 전 과정을 함께 설계합니다."
      />

      {/* Service portfolio */}
      <section className="container-x py-16 md:py-20" style={{ borderTop: "1px solid var(--line)" }}>
        <SectionHeader eyebrow="Our Service Portfolio" title="여섯 개의 서비스, 하나의 실행 구조" max={760} />
        <p className="t-20 text-muted mt-6" style={{ maxWidth: 880 }}>
          {PORTFOLIO_DESC}
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 70}>
              <Link href={serviceHref(s.slug)} className="group form-card flex h-full flex-col p-8">
                <div className="flex items-start justify-between">
                  <span className="text-2xl" aria-hidden="true">
                    {s.icon}
                  </span>
                  <span className="opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                    <ArrowUpRight />
                  </span>
                </div>
                <h3 className="t-24 mt-6" style={{ fontWeight: 500 }}>
                  {s.titleKo}
                </h3>
                <p className="t-13 text-muted mt-1">{s.titleEn}</p>
                <p className="t-15 text-muted mt-4">{s.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Integrated execution */}
      <section className="container-x py-16 md:py-20">
        <div className="on-dark block-dark p-10 md:p-16" style={{ borderRadius: 28 }}>
          <p className="t-13 text-muted" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>
            Integrated Business Execution
          </p>
          <h2 className="t-h3 mt-5" style={{ maxWidth: 820 }}>
            각 서비스를 따로 제공하지 않습니다 — 하나의 실행 체계로 연결합니다
          </h2>
          <p className="t-20 text-muted mt-6" style={{ maxWidth: 760 }}>
            {INTEGRATED_DESC}
          </p>
        </div>
      </section>

      {/* Who we work with */}
      <section className="container-x py-16 md:py-20" style={{ borderTop: "1px solid var(--line)" }}>
        <SectionHeader eyebrow="Who We Work With" title="이런 고객·파트너와 함께합니다" max={680} />
        <ul className="mt-10 grid gap-x-12 sm:grid-cols-2" style={{ borderTop: "1px solid var(--line)" }}>
          {AUDIENCE.map((a) => (
            <li
              key={a}
              className="t-17 flex items-start gap-3 py-4"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dark" aria-hidden="true" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <CTASection
        title="KOBIS GLOBAL과 함께 사업의 다음 단계를 설계하세요"
        sub="새로운 시장 진출, 가맹사업 확장, 개발 프로젝트, 투자 구조 검토가 필요하다면 KOBIS GLOBAL이 사업의 방향과 실행 구조를 함께 검토하겠습니다."
        primary={{ label: "사업 상담 문의", href: "/contact" }}
        secondary={{ label: "회사 소개", href: "/about" }}
      />
    </>
  );
}
