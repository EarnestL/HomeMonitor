/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif', 'Poppins'],
      }, 
      colors: {
        customGray: '#16B364', // Added the # for the hex color value
      },
    },
  },
  plugins: [],
}


