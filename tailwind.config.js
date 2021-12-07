module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: { "1/2": "50%", "2/3": "75%", "3/4": "80%", "9/10": "90%" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
