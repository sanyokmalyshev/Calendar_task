/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"]
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      },
      colors: {
        green: '#2e7d32',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
