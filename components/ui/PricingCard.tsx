import { ACCENTS, cn } from "@/lib/accents";
import { GradientButton } from "./GradientButton";
import type { PricingPlan } from "@/lib/pricing";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const a = ACCENTS[plan.accent];
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1",
        plan.featured
          ? "border border-cyan/40 bg-cyan/[0.04] shadow-glow"
          : "glass hover:border-white/20"
      )}
    >
      {plan.badge && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-dopamine bg-[length:200%_100%] px-3 py-1 text-[11px] font-bold text-[#03121a]">
          {plan.badge}
        </span>
      )}
      <p className={cn("text-[12px] font-semibold uppercase tracking-[0.12em]", a.text)}>{plan.tier}</p>
      <h3 className="mt-1 text-xl font-bold tracking-tight text-cream">{plan.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/60">{plan.description}</p>

      <div className="mt-6">
        <p className="text-3xl font-black tracking-tight text-cream">{plan.price}</p>
        <p className="mt-1 text-[13px] text-cream/55">{plan.priceNote}</p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-cream/70">
            <span className={cn("mt-0.5 shrink-0 font-bold", a.text)} aria-hidden="true">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <GradientButton
        href={plan.cta.href}
        variant={plan.featured ? "primary" : "secondary"}
        className="mt-8 w-full"
      >
        {plan.cta.label}
      </GradientButton>
    </div>
  );
}
