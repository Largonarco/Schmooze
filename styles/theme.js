import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
  colors: {
    brand: {
      50: "#9b6ccfe",
      100: "#b6ccfe",
      200: "#abc4ff",
      300: "#73b7ff",
      400: "#c1d3fe",
      500: "#ccdbfd",
      600: "#d7e3fc",
      700: "#e2eafc",
      800: "#edf2fb",
      900: "#161a1d",
    },
  },
});

export default theme;
