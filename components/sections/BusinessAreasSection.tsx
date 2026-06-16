import { SectionHeader } from "@/components/ui/SectionHeader";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS_AREAS } from "@/lib/business-areas";

export function BusinessAreasSection() {
  return (
    <section id="business-areas" className="container-x scroll-mt-24 py-20 md:py-28">
      <SectionHeader
        eyebrow="Business Areas"
        title={
          <>
            하나의 매장이 아니라,
            <br />
            <span className="text-gradient">완성된 실행 인프라.</span>
          </>
        }
        sub="KOBIS GLOBAL은 한국과 멕시코를 잇는 6개 실행 영역을 하나의 플랫폼으로 운영합니다. 각 영역은 독립적이면서도 서로를 강화합니다."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BUSINESS_AREAS.map((area, i) => (
          <Reveal key={area.slug} delay={(i % 3) * 80}>
            <BusinessCard area={area} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
