module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "1/2": "50%",
        "6/10": "60%",
        "2/3": "75%",
        "8/10": "80%",
        "9/10": "90%",
      },
      colors: {
        gray: {
          50: "#ececec",
          150: "#f7f7f7",
          250: "#e8e8e8",
          550: "#808080",
        },
        blue: {
          550: "#1b68b3",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
