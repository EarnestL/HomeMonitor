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
        smoothPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.6' },
        },
        puff: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.1)' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 10px rgba(255, 255, 0, 0.6), 0 0 20px rgba(255, 255, 0, 0.6)',
            backgroundColor: 'rgba(255, 255, 0, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 255, 0, 0.8), 0 0 40px rgba(255, 255, 0, 0.8)',
            backgroundColor: 'rgba(255, 255, 0, 0.6)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(255, 255, 0, 0.6), 0 0 20px rgba(255, 255, 0, 0.6)',
            backgroundColor: 'rgba(255, 255, 0, 0.4)',
          },
        },
      },
      animation: {
        'bounce-1': 'bounce-sequential 1.2s ease-in-out 0s infinite',
        'bounce-2': 'bounce-sequential 1.2s ease-in-out 0.2s infinite',
        'bounce-3': 'bounce-sequential 1.2s ease-in-out 0.4s infinite',
        'smooth-pulse': 'smoothPulse 2s infinite ease-in-out',
        'puff': 'puff 5s ease-in-out infinite',
        'glow': 'glow 1.5s infinite',
      },
    },
  },
  plugins: [],
}


