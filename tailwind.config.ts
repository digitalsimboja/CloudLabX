import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#1A73E8", // Main primary blue
          light: "#64A6F5", // Lighter variant
          dark: "#0F4CBD",  // Darker variant
        },
        red: {
          DEFAULT: "#FF6F61", // Main secondary red-orange
          light: "#FFA897",  // Lighter variant
          dark: "#D44F45",   // Darker variant
        },
        accent: {
          DEFAULT: "#FFD700", // Main gold accent
          light: "#FFE766",  // Lighter variant
          dark: "#E6C200",   // Darker variant
        },
      },
    },
  },
  plugins: [],
};

export default config;
