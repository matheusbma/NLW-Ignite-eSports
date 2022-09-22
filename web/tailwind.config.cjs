/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']  
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        nlwGradient: 'linear-gradient(90deg, #9572FC 1.08%, #43E7AD 47.94%, #E1D55D 98.57%)',
        gameGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [],
}
