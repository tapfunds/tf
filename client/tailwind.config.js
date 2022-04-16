module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tf-blue": "#48A9FF",
        "tf-blue-light": "#83c5ff",
        "tf-blue-dark": "#1893ff",
        "tf-blue-darker": "#0c77d5",
        "tf-blue-lighter": "#bee1ff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
