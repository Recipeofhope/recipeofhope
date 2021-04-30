const colors = require('tailwindcss/colors')
const customColors = require('./tailwind/colors')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: customColors.primary,
        secondary: customColors.secondary
      },
      fontFamily: {
        'sans': ['Helvetica Neue']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
