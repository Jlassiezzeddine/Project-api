import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
  typography: {
    h1: {
      fontFamily: "Segoe UI",
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1,
      marginTop: "1rem",
    },
    h2: {
      fontFamily: "Segoe UI",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1,
      marginTop: "1rem",
    },
    h3: {
      fontFamily: "Segoe UI",
      fontWeight: 600,
      fontSize: 36,
      lineHeight: 1,
      marginTop: "1rem",
    },
    h4: {
      fontFamily: "Segoe UI",
      fontWeight: 500,
      fontSize: 32,
      lineHeight: 1,
      marginTop: "1rem",
    },
    h5: {
      fontFamily: "Segoe UI",
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1,
      marginTop: "1rem",
    },
    h6: {
      fontFamily: "Segoe UI",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1,
      marginTop: "1rem",
      textTransform: "uppercase",
    },
  },
});
export const defaultTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1920,
    },
  },

  mixins: {
    toolbar: {
      minHeight: 56,
      borderTop: "1px solid rgba(255,255,255,0.08)",
    },
  },
});
