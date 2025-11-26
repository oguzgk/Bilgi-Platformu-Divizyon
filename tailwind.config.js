/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        seljuk: {
          turquoise: '#00BFA5',
          gold: '#FFD700',
          coral: '#FF5252',
          ice: '#F0F4F8',
        }
      }
    },
  },
  plugins: [],
}
