module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: (theme) => ({
      common: "#92e8fd",
      rare: "#fdb077",
      epic: "#bbb2ff",
      legendary: "#fee235",
      white: "#fffefe",
      green: "#44de62",
      red: "#fc937e",
      purple: "#c4c6f6",
      lightblue: "#D0F0FE",
      userlb: "#92e8fd",
      disabled: "#EBEBE4",
    }),
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    height: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
      medCard: "500px",
      desktopCard: "450px",
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1198px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        titleBg: "url('../public/images/titles/title-community-bg.png')",
        filterFafzBg: "url('../public/images/misc/fafz-filter.png')",
        filterSeBg: "url('../public/images/misc/se-filter.png')",
      },
      textColor: {
        border: "#1d1f91",
        twitter: "#1DA1F2",
        discord: "#7289da",
      },
      inset: {
        "-490": "-490px",
        56: "56px",
      },
      fontFamily: {
        bakbak: ["Bakbak One", "cursive"],
        inter: ["Inter", "sans-serif"],
        freckle: ["bodo_amatregular", "cursive"],
      },
    },
  },
  plugins: [],
};
