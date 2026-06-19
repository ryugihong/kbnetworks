import type { ReactNode } from "react";
import { GradientButton } from "@/components/ui/GradientButton";

type Props = {
  title?: ReactNode;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({
  title = "멕시코 시장 진출, 함께 실행할 파트너를 찾습니다.",
  sub = "브랜드와 시스템은 준비되어 있습니다. 필요한 것은 현장에서 함께 실행할 파트너입니다 — 빠른 계약보다 올바른 출발이 먼저입니다.",
  primary = { label: "파트너십 상담 신청", href: "/contact" },
  secondary = { label: "투자 구조 보기", href: "/pricing" },
}: Props) {
  return (
    <section className="container-x py-20 md:py-24">
      <div
        className="on-dark relative overflow-hidden block-dark text-center"
        style={{ borderRadius: 28, padding: "clamp(48px,7vw,96px) 24px" }}
      >
        <h2 className="t-h2 mx-auto" style={{ maxWidth: 760 }}>
          {title}
        </h2>
        <p className="t-20 text-muted mx-auto mt-5" style={{ maxWidth: 560 }}>
          {sub}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <GradientButton href={primary.href}>{primary.label}</GradientButton>
          <GradientButton href={secondary.href} variant="ghost" arrow={false}>
            {secondary.label}
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
