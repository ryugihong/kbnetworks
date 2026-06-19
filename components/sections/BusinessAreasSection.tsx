import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS_AREAS } from "@/lib/business-areas";

function ArrowUpRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BusinessAreasSection() {
  return (
    <section id="business-areas" className="container-x scroll-mt-24 py-24 md:py-28">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Business Areas"
          title="하나의 플랫폼, 여섯 개의 실행 영역"
          sub="한국과 멕시코를 잇는 6개 실행 영역을 하나의 플랫폼으로 운영합니다. 각 영역은 독립적이면서도 서로를 강화합니다."
          max={820}
        />
        <GradientButton href="/services" variant="ghost" arrow={false}>
          전체 서비스 보기 →
        </GradientButton>
      </div>
      <div style={{ borderTop: "1px solid var(--line)" }}>
        {BUSINESS_AREAS.map((a, i) => (
          <Reveal key={a.slug}>
            <Link
              href={a.href}
              className="group grid items-center gap-6 py-8"
              style={{ gridTemplateColumns: "56px 1.1fr 1.6fr auto", borderBottom: "1px solid var(--line)" }}
            >
              <span className="t-15 text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex items-center gap-4">
                <span className="text-2xl" aria-hidden="true">
                  {a.icon}
                </span>
                <div>
                  <h3 className="t-24" style={{ fontWeight: 500 }}>
                    {a.titleKo}
                  </h3>
                  <p className="t-13 text-muted">{a.title}</p>
                </div>
              </div>
              <p className="t-17 text-muted hidden md:block">{a.description}</p>
              <span className="justify-self-end opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
