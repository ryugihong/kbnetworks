import type { Config } from "tailwindcss";

/**
 * KOBIS GLOBAL — "Förm®-inspired" editorial design system.
 * Light surface · giant Anta display · Mona Sans body · floating dark rounded cards.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0E0E0E",
        paper: "#FFFFFF",
        surface: "#F3F4F6",
        tone1: "#E7E2DA",
        tone2: "#DCE3E0",
        tone3: "#E3DEE8",
        tone4: "#E0E6EC",
        accent: "#FF7A00", // KOBIS brand orange — used sparingly
      },
      fontFamily: {
        display: ["Anta", "system-ui", "sans-serif"],
        sans: ["Mona Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "24px",
        block: "28px",
      },
      keyframes: {
        "form-marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "form-marquee 28s linear infinite",
        "marquee-fast": "form-marquee 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
