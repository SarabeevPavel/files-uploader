/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          gray: "#F6F6F6",
          green: "#87D534",
          blue: "#009EE2",
        },
        accent: {
          light: {
            gray: "#EAEBEC",
          },
          dark: {
            gray: "#EAEBEC",
          },
          gray: "#EDEDED",
          green: "#009933",
          blue: "#0f69fa",
        },
        dark: {
          gray: "#49494A",
        },
      },
    },
  },
  plugins: [],
}
