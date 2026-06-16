import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
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

const STEPS = [
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
        title={
          <>
            멕시코 시장,
            <br />
            <span className="text-gradient">함께 개척할 파트너</span>를 찾습니다.
          </>
        }
        lede="브랜드가 준비되어 있고, 시스템이 갖춰져 있습니다. 필요한 것은 현장에서 함께 실행할 파트너입니다 — 빠른 계약보다 올바른 출발이 먼저입니다."
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {INFO.map((x) => (
              <GlassCard key={x.label} className="flex items-start gap-4 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg" aria-hidden="true">
                  {x.icon}
                </span>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-cream/45">{x.label}</p>
                  {x.href ? (
                    <a href={x.href} className="text-sm font-medium text-cream transition-colors hover:text-cyan">
                      {x.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-cream">{x.value}</p>
                  )}
                </div>
              </GlassCard>
            ))}
            <GlassCard>
              <p className="label-eyebrow mb-3">우선 검토 지역</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <span key={r} className="rounded-full border border-hairline px-3 py-1 text-[12px] text-cream/65">
                    {r}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <p className="label-eyebrow mb-8">문의 이후 절차</p>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map(([n, t, d]) => (
            <GlassCard key={n} className="h-full">
              <p className="text-2xl font-black text-gradient">{n}</p>
              <h3 className="mt-3 text-base font-bold text-cream">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{d}</p>
            </GlassCard>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-cream/40">제출하신 정보는 파트너십 검토 목적에 한해 사용됩니다.</p>
      </section>
    </>
  );
}
