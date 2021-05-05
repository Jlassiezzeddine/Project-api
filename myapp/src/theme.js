import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#020916",
    },
    secondary: {
      main: "#ffbb00",
    },
    /* error: {},
    warning: {},
    info: {},
    success: {},
    grey: {}, */
    text: {
      primary: "#eeeeee",
      secondary: "#020916",
    },
    background: {
      default: "#182131",
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      borderTop: "1px solid rgba(255,255,255,0.08)",
    },
  },
});

export default theme;
