/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "2xl": "128px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", ...defaultTheme.fontFamily.serif],
        sans: ["var(--font-sans)", "Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        oxblood: {
          DEFAULT: "#7A1C30",
          50: "#FCF6F7",
          100: "#F7E8EB",
          200: "#EFD0D7",
          300: "#E2A9B5",
          400: "#CE6E83",
          500: "#B53E5B",
          600: "#8E1F3B",
          700: "#7A1C30",
          800: "#631526",
          900: "#4A0E1C",
          950: "#2F0811",
        },
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F0",
          200: "#F5F0E4",
          300: "#EDE4D3",
          400: "#E2D3BD",
          500: "#D3BF9E",
        },
        luxury: {
          bg: "#FAF8F5",
          card: "#FFFFFF",
          border: "#EDE7DE",
          text: "#1C1917",
          muted: "#78716C",
          gold: "#C5A059",
          oxblood: "#7A1C30",
        },
        primary: {
          50: customColors("--c-primary-50"),
          100: customColors("--c-primary-100"),
          200: customColors("--c-primary-200"),
          300: customColors("--c-primary-300"),
          400: customColors("--c-primary-400"),
          500: customColors("--c-primary-500"),
          6000: customColors("--c-primary-600"),
          700: customColors("--c-primary-700"),
          800: customColors("--c-primary-800"),
          900: customColors("--c-primary-900"),
        },
        secondary: {
          50: customColors("--c-secondary-50"),
          100: customColors("--c-secondary-100"),
          200: customColors("--c-secondary-200"),
          300: customColors("--c-secondary-300"),
          400: customColors("--c-secondary-400"),
          500: customColors("--c-secondary-500"),
          6000: customColors("--c-secondary-600"),
          700: customColors("--c-secondary-700"),
          800: customColors("--c-secondary-800"),
          900: customColors("--c-secondary-900"),
        },
        neutral: {
          50: customColors("--c-neutral-50"),
          100: customColors("--c-neutral-100"),
          200: customColors("--c-neutral-200"),
          300: customColors("--c-neutral-300"),
          400: customColors("--c-neutral-400"),
          500: customColors("--c-neutral-500"),
          6000: customColors("--c-neutral-600"),
          700: customColors("--c-neutral-700"),
          800: customColors("--c-neutral-800"),
          900: customColors("--c-neutral-900"),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
