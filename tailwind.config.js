/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        bg: { DEFAULT: "#F5F4F1", dark: "#14161A" },
        surface: { DEFAULT: "#FFFFFF", dark: "#1C1F24" },
        surfacealt: { DEFAULT: "#ECEBE6", dark: "#23262C" },
        border: { DEFAULT: "#DEDCD4", dark: "#33363D" },
        ink: { DEFAULT: "#191A17", dark: "#ECEBE6" },
        inksoft: { DEFAULT: "#6B6A62", dark: "#9C9C97" },
        gold: { DEFAULT: "#B7841E", dark: "#D9A63C" },
        goldsoft: { DEFAULT: "#F1E3C6", dark: "#3A311C" },
        green: { DEFAULT: "#2E6B4F", dark: "#57A57E" },
        greensoft: { DEFAULT: "#DCEAE1", dark: "#1E3327" },
        red: { DEFAULT: "#B14B34", dark: "#E07A5F" },
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
