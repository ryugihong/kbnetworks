import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientBadge } from "@/components/ui/GradientBadge";
import { HERO } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground variant="hero" />
      <div className="container-x relative z-10 grid items-center gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="animate-fade-up">
            <GradientBadge dot>{HERO.badge}</GradientBadge>
          </div>
          <h1
            className="mt-6 animate-fade-up text-balance text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            style={{ animationDelay: "70ms" }}
          >
            <span className="block text-cream">{HERO.headline[0]}</span>
            <span className="block text-gradient">{HERO.headline[1]}</span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-[17px] leading-relaxed text-cream/65"
            style={{ animationDelay: "140ms" }}
          >
            {HERO.sub}
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-4" style={{ animationDelay: "210ms" }}>
            <GradientButton href={HERO.primaryCta.href} variant="primary">
              {HERO.primaryCta.label}
            </GradientButton>
            <GradientButton href={HERO.secondaryCta.href} variant="secondary">
              {HERO.secondaryCta.label} <span aria-hidden="true">→</span>
            </GradientButton>
          </div>
        </div>

        {/* Glass business summary panel */}
        <div className="animate-fade-up" style={{ animationDelay: "260ms" }}>
          <div className="glass-strong rounded-3xl p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/55">
                Execution Platform
              </p>
              <GradientBadge dot>Live</GradientBadge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/5">
              {HERO.panel.map((p) => (
                <div key={p.k} className="bg-base/40 p-5">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-cream/45">{p.k}</p>
                  <p className="mt-1.5 text-sm font-semibold text-cream">{p.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Franchise", "Real Estate", "Project Mgmt", "Trading", "Partnership", "Market Entry"].map((t) => (
                <span key={t} className="rounded-full border border-hairline px-3 py-1 text-[11px] text-cream/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
