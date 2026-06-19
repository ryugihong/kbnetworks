import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_SLUGS, getService, type ServiceSection } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return { title: service.seoTitle, description: service.seoDescription };
}

/** Divided two-column list used for capability and target-audience items. */
function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 grid gap-x-12 sm:grid-cols-2" style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((it) => (
        <li
          key={it}
          className="t-17 flex items-start gap-3 py-4"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dark" aria-hidden="true" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Lede({ children }: { children: string }) {
  return (
    <p className="t-20 text-muted mt-6" style={{ maxWidth: 760 }}>
      {children}
    </p>
  );
}

function NoteCallout({ children }: { children: string }) {
  return (
    <div className="form-card mt-8 p-7" style={{ borderLeft: "3px solid var(--dark)", maxWidth: 820 }}>
      <p className="t-13 text-muted" style={{ letterSpacing: ".04em" }}>
        NOTE
      </p>
      <p className="t-17 mt-2">{children}</p>
    </div>
  );
}

function Section({ section }: { section: ServiceSection }) {
  return (
    <section className="container-x py-16 md:py-20" style={{ borderTop: "1px solid var(--line)" }}>
      <div>
        <SectionHeader eyebrow={section.eyebrow} title={section.title} max={760} />
      </div>

      {section.kind === "intro" && (
        <>
          <Lede>{section.body}</Lede>
          <ItemList items={section.items} />
        </>
      )}

      {section.kind === "prose" && (
        <>
          {section.body && <Lede>{section.body}</Lede>}
          {section.note && <NoteCallout>{section.note}</NoteCallout>}
        </>
      )}

      {section.kind === "list" && (
        <>
          {section.body && <Lede>{section.body}</Lede>}
          <ItemList items={section.items} />
        </>
      )}

      {section.kind === "chips" && (
        <>
          {section.body && <Lede>{section.body}</Lede>}
          <div className="mt-10 flex flex-wrap gap-3">
            {section.items.map((c) => (
              <span key={c} className="pill t-15" style={{ textTransform: "none", letterSpacing: 0 }}>
                {c}
              </span>
            ))}
          </div>
        </>
      )}

      {section.kind === "steps" && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.steps.map((step, i) => (
            <Reveal key={step} delay={(i % 3) * 70}>
              <div className="form-card h-full p-7">
                <p className="t-13 text-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="t-17 mt-3">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {section.kind === "cards" && (
        <>
          {section.body && <Lede>{section.body}</Lede>}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((c, i) => (
              <Reveal key={c.label} delay={(i % 3) * 70}>
                <div className="form-card h-full p-7">
                  <span className="inline-block h-1.5 w-10 rounded-full bg-dark" aria-hidden="true" />
                  <h3 className="t-24 mt-4" style={{ fontWeight: 500 }}>
                    {c.label}
                  </h3>
                  <p className="t-15 text-muted mt-2">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        crumb={service.titleEn}
        parent={{ label: "Services", href: "/services" }}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        lede={service.hero.lede}
      />

      {service.sections.map((section) => (
        <Section key={section.eyebrow} section={section} />
      ))}

      <CTASection
        title={service.cta.title}
        sub="KOBIS GLOBAL이 사업의 방향과 실행 구조를 함께 검토하겠습니다. 부담 없이 현재 상황을 알려주세요."
        primary={{ label: service.cta.button, href: "/contact" }}
        secondary={{ label: "전체 서비스 보기", href: "/services" }}
      />
    </>
  );
}
