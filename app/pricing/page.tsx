import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { PRICING_PLANS, PRICING_DISCLAIMER } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Investment & Packages — 가맹 패키지",
  description:
    "YUN'S SAMYONG FOOD, YUN'S BUFFET, 복합 패키지의 투자 구조와 포함·별도 항목, 로열티 구조, ROI 검토 요인을 투명하게 안내합니다.",
};

const INCLUDED = ["가맹비", "교육비", "계약보증금", "인테리어", "주방장비", "초도물품", "POS / IT / 키오스크"];
const SEPARATE = ["임대보증금", "인허가 · 법무 · 회계", "오픈 마케팅", "운영 예비자금(2~3개월)", "IVA (16%)", "환율 변동분"];
const ROI: [string, string][] = [
  ["입지 · 임대조건", "유동인구·접근성·임대료가 손익의 출발점."],
  ["객단가 · 회전율", "메뉴 구성과 좌석 운영이 매출을 좌우."],
  ["인건비", "현지 인력 구조와 운영 효율."],
  ["배달 비중", "플랫폼 수수료와 채널 믹스."],
  ["원가 · 환율", "이원화 공급망으로 변동 리스크 분산."],
  ["운영 역량", "점주의 참여도와 표준 준수."],
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Investment & Packages"
        title="투명한 투자 구조, 맞는 입구가 있습니다."
        lede="단계별 가맹 옵션 — 어느 단계의 파트너이든 맞는 입구가 있습니다. 명확한 투자 구조로 시작하세요."
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Reveal key={plan.name} className="h-full">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="form-card p-8">
            <p className="t-eyebrow text-muted mb-5">개설비 포함 (예시)</p>
            <ul className="grid grid-cols-2 gap-3">
              {INCLUDED.map((x) => (
                <li key={x} className="t-15 flex items-center gap-2">
                  <span aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-card p-8">
            <p className="t-eyebrow text-muted mb-5">별도 (예시)</p>
            <ul className="grid grid-cols-2 gap-3">
              {SEPARATE.map((x) => (
                <li key={x} className="t-15 text-muted flex items-center gap-2">
                  <span aria-hidden="true">+</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="form-card p-8">
            <p className="t-eyebrow text-muted mb-4">로열티 구조</p>
            <p className="t-17 text-muted">
              로열티는 고정형 또는 매출연동형으로 계약 시 최종 확정됩니다. 총매출/순매출 기준, 납부 주기, 최소 로열티 유무 등은 가맹계약서에 명시됩니다. IVA(16%) 및 현지 세무 처리는 별도 회계 전문가 확인이 필요합니다.
            </p>
          </div>
          <div>
            <SectionHeader eyebrow="ROI를 가르는 변수" title="수익률은 약속이 아니라, 변수의 함수입니다." max={640} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ROI.map(([t, d]) => (
                <div key={t} className="form-card p-5">
                  <p className="t-17 font-medium">{t}</p>
                  <p className="t-15 text-muted mt-1">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="t-13 text-muted mt-8" style={{ maxWidth: 1000 }}>
          {PRICING_DISCLAIMER}
        </p>
      </section>

      <CTASection
        title="투자 구조가 명확해졌다면, 대화를 시작할 시간입니다."
        primary={{ label: "상담 신청하기", href: "/contact" }}
        secondary={{ label: "자주 묻는 질문", href: "/faq" }}
      />
    </>
  );
}
