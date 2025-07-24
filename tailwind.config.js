/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
   container: {
        center: true,
        padding: {
          DEFAULT: "0rem",  // applies to base (all screens)
          sm: "0rem",       // optional, same as DEFAULT
          md: "1rem",       // optional
          lg: "2rem",       // applies to lg (≥1024px)
          xl: "2rem",
          "2xl": "2rem",
        },
        screens: {
          "2xl": "1400px", // max width of container at 2xl
        },
      },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};
