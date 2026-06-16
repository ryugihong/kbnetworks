"use client";

import { useState, type FormEvent } from "react";
import { PremiumInput, PremiumTextarea, PremiumSelect } from "@/components/ui/PremiumField";
import { REGIONS } from "@/lib/site-data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 sm:p-8" noValidate={false}>
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <PremiumInput label="성함" id="name" required placeholder="이름을 입력해 주세요" autoComplete="name" />
          <PremiumInput label="이메일" id="email" type="email" required placeholder="your@email.com" autoComplete="email" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <PremiumInput label="전화 (선택)" id="phone" type="tel" placeholder="+52 ..." autoComplete="tel" />
          <PremiumSelect label="관심 지역" id="region" defaultValue="">
            <option value="" disabled>
              선택해 주세요
            </option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
            <option>기타</option>
          </PremiumSelect>
        </div>
        <PremiumSelect label="관심 영역" id="interest" required defaultValue="">
          <option value="" disabled>
            선택해 주세요
          </option>
          <option>YUN&apos;S SAMYONG FOOD (K-Food QSR)</option>
          <option>YUN&apos;S BUFFET (Korean BBQ 뷔페)</option>
          <option>복합 패키지 (두 브랜드 동시)</option>
          <option>부동산 · 입지 개발</option>
          <option>무역 · 공급망</option>
          <option>일반 파트너십 문의</option>
        </PremiumSelect>
        <PremiumInput label="예상 투자 범위 (선택)" id="budget" placeholder="예: ₩300M 내외 / 협의" />
        <PremiumTextarea
          label="상담 내용"
          id="message"
          required
          placeholder="관심 지역, 예상 투자 범위, 운영 형태, 현재 상황 등을 간략히 적어주세요."
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-dopamine bg-[length:200%_100%] px-6 py-4 text-sm font-bold text-[#03121a] transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-0.5"
      >
        상담 신청 보내기
      </button>

      <p className="mt-3 text-center text-[12px] leading-relaxed text-cream/45" role="status" aria-live="polite">
        {submitted
          ? "문의가 접수되었습니다. KBNETWORKS 담당자가 영업일 기준 48시간 내 회신드립니다. (데모 — 실제 발송되지 않습니다)"
          : "본 문의는 KBNETWORKS (KOBIS GLOBAL 한국지사) 담당자에게 전달됩니다."}
      </p>
    </form>
  );
}
