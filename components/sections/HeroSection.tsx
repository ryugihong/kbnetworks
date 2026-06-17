import { GradientButton } from "@/components/ui/GradientButton";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { HERO, REGIONS } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section
      className="on-dark relative overflow-hidden block-dark"
      style={{ margin: 12, borderRadius: 28, minHeight: "min(90vh, 880px)", display: "flex" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.1) 0%, rgba(14,14,14,0.45) 60%, rgba(14,14,14,0.9) 100%)",
        }}
      />
      <div
        className="container-x relative flex w-full flex-col"
        style={{ paddingTop: "clamp(64px,11vh,128px)", paddingBottom: 40 }}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <GradientBadge>{HERO.badge}</GradientBadge>
          <h1 className="t-hero">
            KOBIS
            <br />
            GLOBAL<sup style={{ fontSize: "0.28em", verticalAlign: "super" }}>®</sup>
          </h1>
          <p className="t-24 text-muted" style={{ maxWidth: 640 }}>
            Korea to Mexico, built for execution. 프랜차이즈 운영 · 부동산 개발 · 프로젝트 관리 · 무역 · 현지 파트너십을 하나의 실행 플랫폼으로 연결합니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GradientButton href={HERO.primaryCta.href}>{HERO.primaryCta.label}</GradientButton>
            <GradientButton href={HERO.secondaryCta.href} variant="ghost" arrow={false}>
              {HERO.secondaryCta.label}
            </GradientButton>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="pill t-13" style={{ padding: "8px 16px" }}>
            <span className="pill-dot" aria-hidden="true" />
            Monterrey — YUN&apos;S SAMYONG FOOD 운영 중
          </span>
          {REGIONS.map((r) => (
            <span key={r} className="pill t-13" style={{ padding: "8px 16px", textTransform: "none", letterSpacing: 0 }}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
