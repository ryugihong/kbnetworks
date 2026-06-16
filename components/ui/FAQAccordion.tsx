"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl glass transition-colors ${isOpen ? "border-cyan/30" : ""}`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-cream transition-colors hover:text-cyan"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl text-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-cream/65">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
