import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { ACCENTS, cn } from "@/lib/accents";
import type { AccentKey } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Process & Growth — 오픈 6단계 로드맵",
  description:
    "상담에서 그랜드 오픈까지 평균 10~14주. KOBIS GLOBAL의 6단계 실행 프로세스, 본사 6개 지원 영역, 단일→복수→권역 성장 경로를 소개합니다.",
};

const SUPPORT: { t: string; d: string; accent: AccentKey }[] = [
  { t: "마케팅 · 홍보", d: "SNS · 인플루언서 · 디지털 홍보물 제작 및 채널 운영 지원.", accent: "coral" },
  { t: "IT · 운영 시스템", d: "POS · 키오스크 · 배달 플랫폼 연동 및 데이터 관리.", accent: "electric" },
  { t: "교육 아카데미", d: "조리 · 위생 · 서비스 · POS 실무 교육 + 온라인 자료 상시 제공.", accent: "cyan" },
  { t: "공급망 관리", d: "한국 본사 + 현지 유통망 이원화로 안정 공급과 원가 관리.", accent: "lime" },
  { t: "QSC 품질 점검", d: "품질(Quality)·서비스(Service)·청결(Cleanliness) 정기 점검.", accent: "violet" },
  { t: "상권 특화 메뉴", d: "현지 입맛·상권 특성에 맞춘 메뉴 컨설팅과 R&D.", accent: "orange" },
];

const STAGES = [
  { s: "Stage 01", t: "Single Unit", d: "첫 매장 안정화에 집중. 초기 1~2년 점주 직접 운영 권장, 본사 슈퍼바이저 현장 지원." },
  { s: "Stage 02", t: "Multi-Unit", d: "검증된 운영 역량 기반 2~3호점 확장. 표준화 시스템이 복수 매장 효율을 뒷받침." },
  { s: "Stage 03", t: "Area Development", d: "도시·권역 단위 우선 개발권 협의(조건부). 복합 한식 허브 거점 확장." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="Execution Process"
        title={
          <>
            최고의 매장은 추측이 아니라,
            <br />
            <span className="text-gradient">검증된 과정</span>에서 나옵니다.
          </>
        }
        lede="상담부터 그랜드 오픈까지 평균 10~14주. 일정·예산·품질·인허가를 본사 매뉴얼 기반으로 통합 관리해 시행착오를 최소화합니다."
      />

      <ProcessSection withHeader={false} />

      <section className="container-x py-12 md:py-20">
        <SectionHeader
          eyebrow="HQ Support — 6개 영역"
          title={<>혼자 운영하지 <span className="text-gradient">않습니다.</span></>}
          sub="매장 운영 이외의 브랜딩·시스템·마케팅 부담 없이 현장에만 집중할 수 있도록 6개 영역을 전방위 지원합니다."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT.map((s, i) => {
            const a = ACCENTS[s.accent];
            return (
              <Reveal key={s.t} delay={(i % 3) * 70}>
                <GlassCard interactive className="h-full">
                  <span className={cn("inline-block h-1.5 w-10 rounded-full", a.bar)} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-cream">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.d}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-12 md:py-20">
        <SectionHeader
          eyebrow="Built to Scale"
          title={<>한 매장에서 <span className="text-gradient">멈추지 않습니다.</span></>}
          sub="안정적으로 운영되는 한 매장은 다음 매장의 기반이 됩니다. 속도보다 안정을 먼저 보고, 검증된 역량이 쌓인 뒤 다음 단계를 함께 논의합니다."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STAGES.map((st, i) => (
            <Reveal key={st.t} delay={(i % 3) * 80}>
              <GlassCard interactive className="h-full">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/40">{st.s}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-gradient">{st.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{st.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[12px] leading-relaxed text-cream/40">
          ※ 동종업계 벤치마크는 참고용이며 개별 파트너의 실적을 보장하지 않습니다. 성장 단계는 매장 안정화 정도와 파트너 역량에 따라 협의로 결정됩니다. 기간은 점포 컨디션·인허가·현지 공사 환경에 따라 달라질 수 있습니다.
        </p>
      </section>

      <CTASection
        title={<>준비된 프로세스,<br /><span className="text-gradient">함께 시작할 파트너.</span></>}
        primary={{ label: "파트너십 상담", href: "/contact" }}
        secondary={{ label: "투자 구조 보기", href: "/pricing" }}
      />
    </>
  );
}
