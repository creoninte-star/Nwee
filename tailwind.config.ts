import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F4F6", // off-white
        secondary: "#EAECEF", // slight contrast gray
        text: {
          DEFAULT: "#343A40", // dark grey
          muted: "#6C757D", // muted grey
        },
        navy: "#0A2342", // dark classic navy
        "navy-light": "#2B4C7E", // faded navy accent
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-epilogue)", "sans-serif"],
        space: ["var(--font-space-grotesk)"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
