"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/navigation";
import { KobisMark } from "@/components/ui/KobisMark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-base/80 backdrop-blur-xl border-gradient-top">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="주요 메뉴">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="KOBIS GLOBAL 홈">
          <KobisMark className="h-7 w-7" />
          <span className="text-[17px]">
            KOBIS GLOBAL<sup className="text-[9px] text-orange">®</sup>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative text-sm transition-colors hover:text-cream ${
                isActive(l.href) ? "text-cream" : "text-cream/60"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-[22px] left-0 right-0 h-0.5 rounded-full bg-dopamine" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full bg-dopamine bg-[length:200%_100%] px-5 py-2.5 text-[13px] font-bold text-[#03121a] transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-0.5 md:inline-flex"
        >
          파트너십 상담
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-cream md:hidden"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-hairline bg-base/95 backdrop-blur-xl`}
      >
        <div className="container-x flex flex-col py-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`border-b border-hairline py-4 text-base ${
                isActive(l.href) ? "text-cream" : "text-cream/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/faq" className="border-b border-hairline py-4 text-base text-cream/70">
            FAQ
          </Link>
          <Link
            href="/contact"
            className="mt-4 rounded-full bg-dopamine bg-[length:200%_100%] px-5 py-3 text-center text-sm font-bold text-[#03121a]"
          >
            파트너십 상담하기
          </Link>
        </div>
      </div>
    </header>
  );
}
