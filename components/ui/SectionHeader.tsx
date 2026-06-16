import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ eyebrow, title, sub, align = "left", className = "" }: Props) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className="label-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-[2.7rem] md:leading-[1.08]">
        {title}
      </h2>
      {sub && <p className="mt-5 text-base leading-relaxed text-cream/65">{sub}</p>}
    </div>
  );
}
