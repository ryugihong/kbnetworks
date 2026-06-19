import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

const fieldClass =
  "w-full rounded-2xl border bg-surface px-4 py-3.5 text-[15px] text-dark outline-none transition placeholder:text-dark/35 focus:border-dark";
const labelClass = "mb-2 block t-13 font-medium text-muted";
const borderStyle = { borderColor: "var(--line)" } as const;

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
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input id={id} name={id} required={required} className={fieldClass} style={borderStyle} {...props} />
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
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        className={`${fieldClass} min-h-[130px] resize-y`}
        style={borderStyle}
        {...props}
      />
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
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <select id={id} name={id} required={required} className={`${fieldClass} appearance-none`} style={borderStyle} {...props}>
        {children}
      </select>
    </div>
  );
}
