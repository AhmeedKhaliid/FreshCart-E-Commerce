/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {boxShadow: {
      "input-focus": "0 0 0 .25rem rgba(10, 173, 10, .25)", // Example green focus shadow
    },},
  },
  plugins: [],
}

