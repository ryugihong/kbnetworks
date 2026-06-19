import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/navigation";
import { SITE, CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer
      className="on-dark relative overflow-hidden block-dark"
      style={{ margin: 12, borderRadius: 28 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg,rgba(14,14,14,0.2),rgba(14,14,14,0.85))" }}
      />
      <div className="container-x relative" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="flex flex-col items-center gap-8 text-center">
          <GradientBadge>Let&apos;s build together</GradientBadge>
          <h2 className="t-h2" style={{ maxWidth: 820 }}>
            당신의 다음 장(章)은 여기서 시작됩니다.
          </h2>
          <p className="t-20 text-muted" style={{ maxWidth: 560 }}>
            한국의 브랜드·시스템과 멕시코 현지의 실행력을 잇습니다. 빠른 계약보다 올바른 출발을 먼저 제안합니다.
          </p>
          <NewsletterForm />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 t-15 text-muted">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-paper">
              {CONTACT.email}
            </a>
            <span aria-hidden="true">·</span>
            <a href={CONTACT.phoneHref} className="hover:text-paper">
              {CONTACT.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a href={CONTACT.webHref} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              {CONTACT.web}
            </a>
          </div>
        </div>

        <div style={{ marginTop: 88 }}>
          <h2 className="t-footer text-center" aria-hidden="true">
            KOBIS GLOBAL<sup style={{ fontSize: "0.3em", verticalAlign: "super" }}>®</sup>
          </h2>
          <div
            className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}
          >
            <span className="t-15 text-muted">
              © {new Date().getFullYear()} {SITE.legal} · {SITE.korea}
            </span>
            <div className="flex flex-wrap items-center gap-6 t-menu">
              {FOOTER_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="opacity-70 transition-opacity hover:opacity-100">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6 t-menu">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {s.label.split(" — ")[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
