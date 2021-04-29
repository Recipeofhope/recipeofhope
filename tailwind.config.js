const colors = require('./tailwind/colors');

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
