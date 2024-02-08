/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");

const tailwind = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baltic-sea': {
          '50': '#f6f6f9',
          '100': '#ededf1',
          '200': '#d7d8e0',
          '300': '#b4b6c5',
          '400': '#8b8da5',
          '500': '#6c6e8b',
          '600': '#575972',
          '700': '#47485d',
          '800': '#3d3e4f',
          '900': '#363744',
          '950': '#24242d',
        },
      },
    },
  },
  plugins: [],
})

module.exports = tailwind