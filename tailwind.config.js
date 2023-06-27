/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["emerald"],
  },
  theme: {
    fontFamily: {
      Lilita: ["Lilita One", "cursive"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
