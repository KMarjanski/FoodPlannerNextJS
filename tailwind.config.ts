import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa", // jasne tło
        background2: "#ffffff", // białe tło
        backgroundtext: "#0f172a", // ciemny tekst
        surface: "#ffffff",
        primary: "#06b6d4", // nowoczesny cyan
        secondary: "#f97316", // pomarańczowy akcent
        accent: "#8b5cf6", // fioletowy akcent
        text: "#0f172a",
        muted: "#64748b",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        label: [
          "0.75rem",
          { lineHeight: "1rem", fontWeight: "500", letterSpacing: "0.05em" },
        ],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        foodies: {
          primary: "#06b6d4",
          secondary: "#f97316",
          accent: "#8b5cf6",
          neutral: "#0f172a",
          "base-100": "#f8f9fa",
          "base-200": "#ffffff",
          info: "#06b6d4",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};

export default config;
