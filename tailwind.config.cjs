/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { gold: "#C8A951" },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        manrope: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.35)",
      }
    },
  },
  plugins: [],
};
