module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
