/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: 'Poppins',
      mont: 'Montserrat',
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#44C1E9",
          "secondary": "#1E95BB",
          "accent": "#44C1E9",
          "neutral": "#B5CDF5",
          "neutral-focus": "#515D77",
          "base-200": "#293852",
          "base-100": "#242836",
          "base-300": "#141C29",
          "info": "#0CA6E9",
          "success": "#2BD4BD",
          "warning": "#F4C152",
          "error": "#FB6F84",
          "white": "#FEFEFE"
        },
      },
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",
    ],
  }
};
