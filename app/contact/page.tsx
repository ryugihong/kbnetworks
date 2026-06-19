import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT, REGIONS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact — 파트너십 문의",
  description:
    "멕시코 K-Food 시장, 함께 개척할 파트너를 찾습니다. 상담 신청, 운영 거점, 직통 연락처. 빠른 계약보다 올바른 출발을 먼저 제안합니다.",
};

const INFO = [
  { icon: "✉", label: "이메일", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: "☎", label: "멕시코 직통", value: `${CONTACT.phone} (${CONTACT.phonePerson})`, href: CONTACT.phoneHref },
  { icon: "🌐", label: "웹사이트", value: CONTACT.web, href: CONTACT.webHref },
  { icon: "📍", label: "운영 거점", value: CONTACT.address },
];

const STEPS: [string, string, string][] = [
  ["01", "접수 · 검토", "문의 접수 후 영업일 기준 48시간 내 회신드립니다."],
  ["02", "1차 상담 · 적합성 확인", "브랜드 비전·투자 규모·후보 지역을 함께 점검합니다."],
  ["03", "상권 · 투자 구체화", "현장 실사와 COF·견적을 통해 조건을 확정합니다."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Partnership"
        title="멕시코 시장, 함께 개척할 파트너를 찾습니다."
        lede="브랜드가 준비되어 있고, 시스템이 갖춰져 있습니다. 필요한 것은 현장에서 함께 실행할 파트너입니다 — 빠른 계약보다 올바른 출발이 먼저입니다."
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {INFO.map((x) => (
              <div key={x.label} className="form-card flex items-start gap-4 p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface text-lg" aria-hidden="true">
                  {x.icon}
                </span>
                <div>
                  <p className="t-13 text-muted">{x.label}</p>
                  {x.href ? (
                    <a href={x.href} className="t-17 font-medium hover:opacity-70">
                      {x.value}
                    </a>
                  ) : (
                    <p className="t-17 font-medium">{x.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="form-card p-6">
              <GradientBadge>우선 검토 지역</GradientBadge>
              <div className="mt-4 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <span key={r} className="pill t-13" style={{ textTransform: "none", letterSpacing: 0 }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-28">
        <GradientBadge>문의 이후 절차</GradientBadge>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="form-card p-8">
              <p className="t-h4">{n}</p>
              <h3 className="t-24 mt-3" style={{ fontWeight: 500 }}>
                {t}
              </h3>
              <p className="t-15 text-muted mt-2">{d}</p>
            </div>
          ))}
        </div>
        <p className="t-13 text-muted mt-6">제출하신 정보는 파트너십 검토 목적에 한해 사용됩니다.</p>
      </section>
    </>
  );
}
