import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Process & Growth — 오픈 6단계 로드맵",
  description:
    "상담에서 그랜드 오픈까지 평균 10~14주. KOBIS GLOBAL의 6단계 실행 프로세스, 본사 6개 지원 영역, 단일→복수→권역 성장 경로를 소개합니다.",
};

const SUPPORT: [string, string][] = [
  ["마케팅 · 홍보", "SNS · 인플루언서 · 디지털 홍보물 제작 및 채널 운영 지원."],
  ["IT · 운영 시스템", "POS · 키오스크 · 배달 플랫폼 연동 및 데이터 관리."],
  ["교육 아카데미", "조리 · 위생 · 서비스 · POS 실무 교육 + 온라인 자료 상시 제공."],
  ["공급망 관리", "한국 본사 + 현지 유통망 이원화로 안정 공급과 원가 관리."],
  ["QSC 품질 점검", "품질·서비스·청결 정기 점검으로 매장 표준 유지."],
  ["상권 특화 메뉴", "현지 입맛·상권 특성에 맞춘 메뉴 컨설팅과 R&D."],
];

const STAGES: [string, string, string][] = [
  ["Stage 01", "Single Unit", "첫 매장 안정화에 집중. 초기 1~2년 점주 직접 운영 권장, 본사 슈퍼바이저 현장 지원."],
  ["Stage 02", "Multi-Unit", "검증된 운영 역량 기반 2~3호점 확장. 표준화 시스템이 복수 매장 효율을 뒷받침."],
  ["Stage 03", "Area Development", "도시·권역 단위 우선 개발권 협의(조건부). 복합 한식 허브 거점 확장."],
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="Execution Process"
        title="최고의 매장은 추측이 아니라, 검증된 과정에서 나옵니다."
        lede="상담부터 그랜드 오픈까지 평균 10~14주. 일정·예산·품질·인허가를 본사 매뉴얼 기반으로 통합 관리해 시행착오를 최소화합니다."
      />

      <ProcessSection withHeader={false} />

      <section className="container-x py-16 md:py-20">
        <div className="mb-12">
          <SectionHeader eyebrow="HQ Support — 6개 영역" title="혼자 운영하지 않습니다" max={680} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 70}>
              <div className="form-card p-7">
                <span className="inline-block h-1.5 w-10 rounded-full bg-dark" aria-hidden="true" />
                <h3 className="t-24 mt-4" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-15 text-muted mt-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Built to Scale"
            title="한 매장에서 멈추지 않습니다"
            sub="안정적으로 운영되는 한 매장은 다음 매장의 기반이 됩니다. 속도보다 안정을 먼저 보고, 검증된 역량이 쌓인 뒤 다음 단계를 함께 논의합니다."
            max={680}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {STAGES.map(([s, t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 70}>
              <div className="form-card p-8">
                <p className="t-13 text-muted">{s}</p>
                <h3 className="t-h6 mt-2" style={{ fontWeight: 500 }}>
                  {t}
                </h3>
                <p className="t-15 text-muted mt-3">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="t-13 text-muted mt-6" style={{ maxWidth: 1000 }}>
          ※ 동종업계 벤치마크는 참고용이며 개별 파트너의 실적을 보장하지 않습니다. 기간은 점포 컨디션·인허가·현지 공사 환경에 따라 달라질 수 있습니다.
        </p>
      </section>

      <CTASection
        title="준비된 프로세스, 함께 시작할 파트너."
        primary={{ label: "파트너십 상담", href: "/contact" }}
        secondary={{ label: "투자 구조 보기", href: "/pricing" }}
      />
    </>
  );
}
