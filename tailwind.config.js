/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#9E9A96',
          200: '#A8A29C',
          400: '#ECE3DE',
          800: '#846D62'
        },
        secondary: {
          400: '#FDF7F2',
        }
      }
    },
  },
  plugins: [],
}