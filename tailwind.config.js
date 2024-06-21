/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textarea_bg_color: "#F5F5F5",
      },
      screens: {
        "landscape-1024": {
          raw: "(min-width: 1024px) and (orientation: landscape)",
        },
      },
    },
  },
  plugins: [],
};
