"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          이메일 주소
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="이메일 주소"
          className="min-w-0 flex-1 rounded-full border border-hairline bg-white/[0.04] px-4 py-2.5 text-[13px] text-cream placeholder:text-cream/35 outline-none transition focus:border-cyan/60"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-dopamine bg-[length:200%_100%] px-5 py-2.5 text-[13px] font-bold text-[#03121a] transition hover:bg-[position:100%_0]"
        >
          구독
        </button>
      </div>
      <p className="mt-2 text-[12px] text-cream/45" role="status">
        {done ? "구독 신청이 접수되었습니다. (데모 — 실제 발송되지 않습니다)" : "K-Food 멕시코 시장 인사이트를 받아보세요."}
      </p>
    </form>
  );
}
