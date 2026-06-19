import { cn } from "@/lib/accents";
import { GradientButton } from "./GradientButton";
import type { PricingPlan } from "@/lib/pricing";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const dark = !!plan.featured;
  return (
    <div
      className={cn("flex h-full flex-col gap-7 p-10", dark ? "on-dark block-dark" : "form-card")}
      style={{ borderRadius: 28 }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="pill t-13" style={{ padding: "6px 14px" }}>
          {plan.tier}
        </span>
        {plan.badge && <span className="t-13 text-muted text-right">{plan.badge}</span>}
      </div>

      <div>
        <h3 className="t-h5">{plan.name}</h3>
        <p className="t-15 text-muted mt-3">{plan.description}</p>
      </div>

      <div>
        <span className="t-h4">{plan.price}</span>
        <p className="t-15 text-muted mt-2">{plan.priceNote}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="t-15 text-muted flex items-start gap-2.5">
            <Check />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <GradientButton href={plan.cta.href} variant={dark ? "primary" : "ghost"} className="w-full">
        {plan.cta.label}
      </GradientButton>
    </div>
  );
}
