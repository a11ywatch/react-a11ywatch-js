const colors = require("tailwindcss/colors");

const fontFamilys = [
  "system-ui",
  "-apple-system",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
];

const theme = {
  colors: {
    main: "gray",
    secondary: "#5c6bc0",
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    gray: colors.trueGray,
    red: colors.red,
    blue: colors.sky,
    yellow: colors.amber,
    purple: colors.purple,
    green: colors.green,
    indigo: colors.indigo,
  },
  fontFamily: {
    display: fontFamilys,
    body: fontFamilys,
  },
  textColor: (theme) => theme("colors"),
  backgroundColor: (theme) => ({
    ...theme("colors"),
    primary: "#3490dc",
    secondary: "#ffed4a",
    danger: "#e3342f",
  }),
};

module.exports = {
  theme,
};
