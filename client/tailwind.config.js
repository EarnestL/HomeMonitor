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
      keyframes: {
        'bounce-sequential': {
            '0%, 20%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
            '80%, 100%': { transform: 'translateY(0)' },
        },
        'fade-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'bounce-1': 'bounce-sequential 1.2s ease-in-out 0s infinite',
        'bounce-2': 'bounce-sequential 1.2s ease-in-out 0.2s infinite',
        'bounce-3': 'bounce-sequential 1.2s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [],
}


