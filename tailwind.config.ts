import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /**
       * The semantic colours of the site, taken from the css variables declared on .theme_defult in
       * globals.scss so a theme change keeps flowing from one place. Declaring them here is what
       * makes the tailwind variants work, `hover:border-primary` and `bg-primary/10` can not be
       * built out of the plain `.bg-primary` class that globals.scss defines.
       */
      colors: {
        primary: "rgb(var(--rgb-primary-color) / <alpha-value>)",
        secondary: "rgb(var(--rgb-secondary-color) / <alpha-value>)",
        pink: "rgb(var(--rgb-pink-color) / <alpha-value>)",
        //text shades, deep for a heading and muted for a supporting line
        deep: "var(--text-color-deep)",
        muted: "var(--text-color-light)",
        line: "var(--border-color)",
        "line-light": "var(--border-color-light)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
