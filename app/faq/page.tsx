import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ — 자주 묻는 질문",
  description:
    "가맹 자격, 일정, 본사 지원, 투자 비용, 지역, 로열티, 교육, 공급망, FIFA 2026까지 — KOBIS GLOBAL 파트너십에 관한 12가지 질문과 답변.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        eyebrow="Frequently Asked"
        title="궁금한 건 솔직하게, 중요한 건 빠짐없이."
        lede="파트너십을 시작하기 전 가장 많이 묻는 질문들을 정리했습니다. 원하는 답을 찾지 못하셨다면 언제든 직접 문의해 주세요."
      />
      <FAQSection items={FAQS} />
      <p className="container-x t-13 text-muted pb-4" style={{ maxWidth: 900 }}>
        ※ 상기 금액·조건은 예비 검토용 참고치이며, 최종 조건은 COF·가맹계약서·현장 실사 후 확정됩니다.
      </p>
      <CTASection
        title="답을 찾으셨다면, 다음은 대화입니다."
        primary={{ label: "질문 보내기", href: "/contact" }}
        secondary={{ label: "시장 데이터 보기", href: "/market" }}
      />
    </>
  );
}
