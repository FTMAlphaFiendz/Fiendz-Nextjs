module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#2C061F",
        darkPrimary: "#374045",
        darkSecondary: "#D89216",
        darkAccent: "#E1D89F",
        lightBg: "#FFFFFF",
        lightPrimary: "#4169e1",
        lightSecondary: "#000000",
        lightAccent: "#1e90ff",
      },
    },
  },
  plugins: [],
};
