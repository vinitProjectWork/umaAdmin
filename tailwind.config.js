/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    minWidth: {
      "1/4": "25%",
    },
    fontSize: {
      extraSmall: '0.5rem',
      mediumSmall: '0.65rem',
      xs: '0.8rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1rem',
      lg:'1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    extend: {},
  },
  plugins: [],
};
