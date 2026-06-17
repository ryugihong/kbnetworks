"use client";

import { useState, type FormEvent } from "react";

/** Email capture used on the dark CTA/footer block. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <div className="flex w-full flex-col items-center gap-3" style={{ maxWidth: 480 }}>
      <form onSubmit={handleSubmit} className="flex w-full flex-wrap items-center justify-center gap-3">
        <label htmlFor="cta-email" className="sr-only">
          이메일 주소
        </label>
        <div
          className="flex flex-1 items-center gap-2 rounded-full px-5 py-3.5"
          style={{ minWidth: 240, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            id="cta-email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full bg-transparent text-[15px] text-paper outline-none placeholder:text-white/40"
          />
        </div>
        <button type="submit" className="btn-primary">
          Get started
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
      <p className="t-13 text-muted" role="status">
        {done ? "접수되었습니다. (데모 — 실제 발송되지 않습니다)" : "파트너십 인사이트를 받아보세요."}
      </p>
    </div>
  );
}
