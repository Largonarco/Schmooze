import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  colors: {
    brand: {
      50: "#e6f0fe",
      100: "#bcd6f8",
      200: "#92c0f3",
      300: "#6aacf0",
      400: "#4d9cec",
      500: "#3e8ad3",
      600: "#316fa4",
      700: "#225274",
      800: "#123346",
      900: "#011219",
    },
  },
});

export default theme;
