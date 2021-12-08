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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
