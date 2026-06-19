import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { GradientBadge } from "@/components/ui/GradientBadge";
import type { Faq } from "@/lib/faqs";

export function FAQSection({ items }: { items: Faq[] }) {
  return (
    <section className="container-x py-24 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GradientBadge>FAQ</GradientBadge>
          <h2 className="t-h3 mt-6" style={{ maxWidth: 360 }}>
            자주 묻는 질문
          </h2>
          <p className="t-17 text-muted mt-6" style={{ maxWidth: 360 }}>
            가맹·일정·투자·지원 범위에 관해 가장 많이 묻는 질문을 정리했습니다. 계약 전에도 솔직하게 답변드립니다.
          </p>
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
