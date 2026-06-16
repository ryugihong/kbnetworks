import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

const fieldClass =
  "w-full rounded-xl border border-hairline bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition focus:border-cyan/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan/20";
const labelClass = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-cream/55";

type Base = { label: string; id: string; required?: boolean };

export function PremiumInput({
  label,
  id,
  required,
  ...props
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input id={id} name={id} required={required} className={fieldClass} {...props} />
    </div>
  );
}

export function PremiumTextarea({
  label,
  id,
  required,
  ...props
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <textarea id={id} name={id} required={required} className={`${fieldClass} min-h-[130px] resize-y`} {...props} />
    </div>
  );
}

export function PremiumSelect({
  label,
  id,
  required,
  children,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <select id={id} name={id} required={required} className={`${fieldClass} appearance-none`} {...props}>
        {children}
      </select>
    </div>
  );
}
