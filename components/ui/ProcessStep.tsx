import type { ProcessStep as Step } from "@/lib/pricing";

type Props = {
  step: Step;
  /** 1-based position / total for the progress bar */
  i: number;
  total: number;
};

export function ProcessStep({ step, i, total }: Props) {
  const pct = Math.round(((i + 1) / total) * 100);
  return (
    <div className="form-card flex flex-col justify-between p-7" style={{ minHeight: 290 }}>
      <div className="flex items-center justify-between">
        <span className="t-15 text-muted">{step.no}</span>
        <span className="pill t-13" style={{ padding: "4px 12px" }}>
          {step.duration}
        </span>
      </div>
      <div>
        <h3 className="t-h6" style={{ fontWeight: 500 }}>
          {step.title}
        </h3>
        <p className="t-15 text-muted mt-3">{step.desc}</p>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
        <div className="h-full rounded-full bg-dark" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
