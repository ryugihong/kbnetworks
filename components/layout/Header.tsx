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
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--line)", background: "rgba(243,244,246,0.82)", backdropFilter: "blur(14px)" }}
    >
      <nav className="container-x flex h-[68px] items-center justify-between" aria-label="주요 메뉴">
        <Link href="/" className="flex items-center gap-2.5" aria-label="KOBIS GLOBAL 홈">
          <KobisMark className="h-7 w-7 text-dark" />
          <span className="t-h6" style={{ fontWeight: 500, fontSize: 20 }}>
            KOBIS GLOBAL<sup style={{ fontSize: 10 }}>®</sup>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className="t-menu transition-opacity hover:opacity-100"
              style={{ opacity: isActive(l.href) ? 1 : 0.55 }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="btn-primary hidden md:inline-flex" style={{ padding: "12px 22px", fontSize: 14 }}>
          파트너십 상담
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`${open ? "block" : "hidden"} border-t md:hidden`}
        style={{ borderColor: "var(--line)", background: "var(--surface)" }}
      >
        <div className="container-x flex flex-col py-3">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="t-24 border-b py-4" style={{ borderColor: "var(--line)", fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/faq" className="t-24 border-b py-4" style={{ borderColor: "var(--line)", fontWeight: 500 }}>
            FAQ
          </Link>
          <Link href="/contact" className="btn-primary mt-4">
            파트너십 상담하기
          </Link>
        </div>
      </div>
    </header>
  );
}
