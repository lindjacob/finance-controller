/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9333EA',
        secondary: '#e5e7eb'
      },
      gridTemplateRows: {
        'custom-3': 'auto auto 2fr'
      }  
    },
  },
  plugins: [],
}

