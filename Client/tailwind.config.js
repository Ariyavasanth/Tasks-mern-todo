/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1663CC",
        },

        surface: {
          // app: "#F5F5F5",
          card: "#FFFFFF",
          muted: "#F0F0F0",
        },

        text: {
          primary: "#000000",
          secondary: "#757575",
          muted: "#9CA3AF",
        },

        status: {
          info: {
            DEFAULT: "#242AF9",
            bg: "#D7D8FE",
          },
          success: {
            DEFAULT: "#8DE88D",
            bg: "#E5FAE5",
          },
          danger: {
            DEFAULT: "#FF0033",
            bg: "#FAE5EA",
          },
          warning: {
            bg: "#FFF5E5",
          },
        },

        border: {
          default: "#CDCED0",
          info: "#242AF9",
          success: "#8DE88D",
          danger: "#FF0033",
        },
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
