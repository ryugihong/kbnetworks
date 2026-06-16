import type { Config } from "tailwindcss";

/**
 * KOBIS GLOBAL — "Premium Dopamine" Design System
 * Dark, vivid-but-controlled, glassmorphism + controlled neon glow.
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
        base: "#050816",
        cream: "#F8F5E9",
        electric: "#2F7BFF",
        cyan: "#00E5FF",
        lime: "#B6FF00",
        coral: "#FF4D6D",
        violet: "#8B5CF6",
        orange: "#FF7A00",
        // semantic
        ink: "#050816",
        surface: "rgba(255,255,255,0.05)",
        hairline: "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "dopamine":
          "linear-gradient(110deg, #2F7BFF 0%, #00E5FF 50%, #8B5CF6 100%)",
        "dopamine-soft":
          "linear-gradient(110deg, rgba(47,123,255,0.18), rgba(0,229,255,0.12), rgba(139,92,246,0.18))",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,229,255,0.25), 0 18px 60px -20px rgba(47,123,255,0.45)",
        "glow-violet":
          "0 0 0 1px rgba(139,92,246,0.30), 0 18px 60px -20px rgba(139,92,246,0.5)",
        "glow-lime":
          "0 0 0 1px rgba(182,255,0,0.30), 0 18px 60px -20px rgba(182,255,0,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -30px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-26px,0) scale(1.06)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(18px,18px,0) scale(1.08)" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "60%,100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease both",
        float: "float 9s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        shine: "shine 1.1s ease",
      },
    },
  },
  plugins: [],
};

export default config;
