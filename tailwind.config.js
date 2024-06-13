/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '840px',
      lg: '990px',
      xl: '1440px',
    },
    extend: {
      colors: {
      }
    },
  },
  plugins: [],
}

