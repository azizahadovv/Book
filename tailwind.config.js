/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fefefe",
        white:'#fefefe',
        btn: "#6200EE",
        blackText: "#151515",
        whiteText: "#333333",
        pinkText: "#9654F4",
        blue: "#1B28BC",
      },
    },
    fontFamily: {
      mulish: "Mulish sans-serif ",
    },
    screens: {
      minMobil: "320px",
      // => @media (min-width: 320px) { ... }

      mobil: "425px",
      // => @media (min-width: 425px) { ... }

      tablet: "700px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
      fullHd: "1440px",
    },
  },
  plugins: [],
};
