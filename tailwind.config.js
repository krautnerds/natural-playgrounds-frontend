module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: "#695f5c",
        tan: "#f0e7de",
        "light-gray": "#e9e9e9",
        "yellow-gray": "#e5ebe4",
        "dark-green": "#0d5352",
        "blue-green": "#0b6265",
        "light-green": "#adc0ba",
        "natural-red": "#b93b36",
        sand: "#f0e7de",
      },
      fontFamily: {
        rounded: ["Publica Play Regular", "Helvetica", "Arial", "sans-serif"],
        body: ['"Open Sans"', '"Helvetica Neue", Helvetica, Arial, sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-container-bleed"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
