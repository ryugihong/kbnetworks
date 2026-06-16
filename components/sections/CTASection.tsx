import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title?: React.ReactNode;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({
  title = (
    <>
      멕시코 시장 진출,
      <br />
      <span className="text-gradient">함께 실행할 파트너</span>를 찾습니다.
    </>
  ),
  sub = "브랜드와 시스템은 준비되어 있습니다. 필요한 것은 현장에서 함께 실행할 파트너입니다 — 빠른 계약보다 올바른 출발이 먼저입니다.",
  primary = { label: "파트너십 상담 신청", href: "/contact" },
  secondary = { label: "투자 구조 보기", href: "/pricing" },
}: Props) {
  return (
    <section className="container-x py-20 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-dopamine-soft px-6 py-16 text-center md:px-12">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.12]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70">{sub}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <GradientButton href={primary.href} variant="lime">
                {primary.label}
              </GradientButton>
              <GradientButton href={secondary.href} variant="secondary">
                {secondary.label}
              </GradientButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
