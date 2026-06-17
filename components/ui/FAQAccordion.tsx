"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="form-card" style={{ padding: "8px 32px" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderBottom: i === items.length - 1 ? "none" : "1px solid var(--line)" }}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="t-24" style={{ fontWeight: 500 }}>
                  {item.q}
                </span>
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              style={{
                maxHeight: isOpen ? 320 : 0,
                overflow: "hidden",
                transition: "max-height .35s ease, opacity .35s ease",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="t-17 text-muted pb-6" style={{ maxWidth: 720 }}>
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
