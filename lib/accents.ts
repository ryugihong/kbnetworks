import type { AccentKey } from "./site-data";

/**
 * Static Tailwind class strings per accent so the JIT compiler can see them.
 * Never build accent classes dynamically (e.g. `text-${accent}`) — they get purged.
 */
export type AccentStyle = {
  text: string;
  border: string;
  hoverBorder: string;
  hoverGlow: string;
  iconWrap: string;
  bar: string;
  hex: string;
};

export const ACCENTS: Record<AccentKey, AccentStyle> = {
  electric: {
    text: "text-electric",
    border: "border-electric/40",
    hoverBorder: "group-hover:border-electric/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(47,123,255,0.55)]",
    iconWrap: "bg-electric/10 text-electric ring-1 ring-electric/30",
    bar: "bg-electric",
    hex: "#2F7BFF",
  },
  cyan: {
    text: "text-cyan",
    border: "border-cyan/40",
    hoverBorder: "group-hover:border-cyan/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(0,229,255,0.5)]",
    iconWrap: "bg-cyan/10 text-cyan ring-1 ring-cyan/30",
    bar: "bg-cyan",
    hex: "#00E5FF",
  },
  lime: {
    text: "text-lime",
    border: "border-lime/40",
    hoverBorder: "group-hover:border-lime/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(182,255,0,0.4)]",
    iconWrap: "bg-lime/10 text-lime ring-1 ring-lime/30",
    bar: "bg-lime",
    hex: "#B6FF00",
  },
  coral: {
    text: "text-coral",
    border: "border-coral/40",
    hoverBorder: "group-hover:border-coral/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(255,77,109,0.5)]",
    iconWrap: "bg-coral/10 text-coral ring-1 ring-coral/30",
    bar: "bg-coral",
    hex: "#FF4D6D",
  },
  violet: {
    text: "text-violet",
    border: "border-violet/40",
    hoverBorder: "group-hover:border-violet/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(139,92,246,0.55)]",
    iconWrap: "bg-violet/10 text-violet ring-1 ring-violet/30",
    bar: "bg-violet",
    hex: "#8B5CF6",
  },
  orange: {
    text: "text-orange",
    border: "border-orange/40",
    hoverBorder: "group-hover:border-orange/50",
    hoverGlow: "group-hover:shadow-[0_24px_70px_-26px_rgba(255,122,0,0.5)]",
    iconWrap: "bg-orange/10 text-orange ring-1 ring-orange/30",
    bar: "bg-orange",
    hex: "#FF7A00",
  },
};

/** Tiny classnames helper. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
