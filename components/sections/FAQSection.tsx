import Link from "next/link";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CONTACT } from "@/lib/site-data";
import type { Faq } from "@/lib/faqs";

export function FAQSection({ items }: { items: Faq[] }) {
  return (
    <section className="container-x py-20 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="label-eyebrow mb-4">FAQ</p>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            궁금한 건 솔직하게,
            <br />
            <span className="text-gradient">중요한 건 빠짐없이.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/65">
            원하는 답변을 찾지 못하셨나요? 계약 전에도 솔직하게 답변드립니다.
          </p>
          <div className="mt-7 rounded-2xl glass p-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-base font-bold text-cyan">
              {CONTACT.partnership.initials}
            </div>
            <p className="mt-3 text-sm font-semibold text-cream">{CONTACT.partnership.name}</p>
            <p className="text-[13px] text-cream/55">{CONTACT.partnership.role}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-dopamine bg-[length:200%_100%] px-5 py-2.5 text-[13px] font-bold text-[#03121a] transition hover:bg-[position:100%_0]"
            >
              질문 보내기
            </Link>
          </div>
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
