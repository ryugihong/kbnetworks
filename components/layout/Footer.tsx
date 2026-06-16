import Link from "next/link";
import { KobisMark } from "@/components/ui/KobisMark";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/navigation";
import { SITE, CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-hairline border-gradient-top">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5 font-extrabold tracking-tight">
            <KobisMark className="h-8 w-8" />
            <span className="text-lg">
              KOBIS GLOBAL<sup className="text-[9px] text-orange">®</sup>
            </span>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-cream/45">
            {SITE.legal} · {SITE.korea}
          </p>
          <p className="mt-5 text-2xl font-extrabold tracking-tight">
            <span className="text-gradient">Great begins here.</span>
          </p>
          <div className="mt-5 space-y-1.5 text-[13px] text-cream/55">
            <p>
              [ Email ]{" "}
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-cyan">
                {CONTACT.email}
              </a>
            </p>
            <p>
              [ Mexico ]{" "}
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-cyan">
                {CONTACT.phone}
              </a>
            </p>
            <p>
              [ Web ]{" "}
              <a href={CONTACT.webHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
                {CONTACT.web}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/45">Navigation</p>
          <ul className="space-y-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/65 transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/45">Social</p>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/65 transition-colors hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/45">Newsletter</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
          <p className="text-[13px] text-cream/45">
            © {new Date().getFullYear()} {SITE.legal}. All rights reserved. | {SITE.korea}
          </p>
          <div className="flex gap-6 text-[13px] text-cream/45">
            <Link href="/contact" className="transition-colors hover:text-cream/70">개인정보처리방침</Link>
            <Link href="/contact" className="transition-colors hover:text-cream/70">이용약관</Link>
            <Link href="/faq" className="transition-colors hover:text-cream/70">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
