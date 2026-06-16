import type { ProcessStep as Step } from "@/lib/pricing";

export function ProcessStep({ step, last = false }: { step: Step; last?: boolean }) {
  return (
    <div className="relative pl-16 pb-10 last:pb-0">
      {!last && <span className="absolute left-[19px] top-2 h-full w-px bg-hairline" aria-hidden="true" />}
      <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full glass text-sm font-bold text-cyan">
        {step.no}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-bold tracking-tight text-cream">{step.title}</h3>
        <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-0.5 text-[11px] font-semibold text-cyan">
          {step.duration}
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream/65">{step.desc}</p>
      {step.tasks && (
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          {step.tasks.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[13px] text-cream/55">
              <span className="text-cyan" aria-hidden="true">
                ›
              </span>
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
