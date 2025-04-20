import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue": "#1A73E8",
        "blue-light": "#64A6F5",
        "blue-dark": "#0F4CBD",
        "red": "#FF6F61",
        "red-light": "#FFA897",
        "red-dark": "#D44F45",
        "accent": "#FFD700",
        "accent-light": "#FFE766",
        "accent-dark": "#E6C200",
        "background": "var(--background)",
        "foreground": "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
