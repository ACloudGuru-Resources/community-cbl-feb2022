module.exports = { 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], 
  theme: { 
    extend: {
      colors: {
        accent: {
          50: '#fbe4ed',
          100: '#f8c6d8',
          200: '#f4a1c2',
          300: '#f072a9',
          400: '#ec008c',
          500: '#ec008c',
          600: '#e00085',
          700: '#d3007d',
          800: '#c50075',
          900: '#b7006c'
        }
      }
    }, 
  }, plugins: [
    require('@tailwindcss/aspect-ratio')
  ], 
}