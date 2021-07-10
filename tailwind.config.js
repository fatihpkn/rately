module.exports = {
  purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0.2 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn .25s linear",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
