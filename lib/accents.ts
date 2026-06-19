import type { AccentKey } from "./site-data";

/**
 * In the Förm-inspired system, "accents" map to soft neutral tone backgrounds
 * used for tactile cards. The palette stays monochrome + tonal (not neon).
 */
export const ACCENTS: Record<AccentKey, { tone: string }> = {
  electric: { tone: "#E0E6EC" },
  cyan: { tone: "#DCE3E0" },
  lime: { tone: "#E7E2DA" },
  coral: { tone: "#E3DEE8" },
  violet: { tone: "#E3DEE8" },
  orange: { tone: "#E7E2DA" },
};

export const TONES = ["#E7E2DA", "#DCE3E0", "#E3DEE8", "#E0E6EC"] as const;

/** Tiny classnames helper. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
