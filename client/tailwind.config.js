/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F0E40", // Slack purple
        accent: "#611F69",
      },
    },
  },
  plugins: [],
};
