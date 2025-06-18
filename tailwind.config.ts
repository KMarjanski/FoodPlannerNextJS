import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#eae3cb", // jasnobeżowe retro tło
        background2: "#c3bca7", // ciemniejsze beżowe tło
        backgroundtext: "#3b7dd8", // jasnoniebieskie tło dla tekst
        surface: "#ffffff",
        primary: "#2b8abf", // retro niebieski (przyciski/linki)
        secondary: "#f78c6b", // pastelowy pomarańczowy (akcenty)
        accent: "#8a3ffc", // retro fioletowy
        text: "#1b1b1b",
        muted: "#757575",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        retro: ["var(--font-retro)", "monospace"],
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
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        foodies: {
          primary: "#2b8abf",
          secondary: "#f78c6b",
          accent: "#8a3ffc",
          neutral: "#1b1b1b",
          "base-100": "#eae3cb",
          "base-200": "#ffffff",
          info: "#2b8abf",
          success: "#34d399",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
    ],
  },
};

export default config;
