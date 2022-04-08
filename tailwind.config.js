module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['"Fraunces"', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'monospace'],
    },
    boxShadow: {
      DEFAULT: '0 4px 12px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.1))',
      lg: '0 6px 18px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.15))',
      xl: '0 8px 24px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.2))',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
