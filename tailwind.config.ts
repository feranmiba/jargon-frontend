import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary))",
        base: "hsl(var(--color-bg))",
        title: "hsl(var(--color-title))",
        note: "hsl(var(--color-note))",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;
