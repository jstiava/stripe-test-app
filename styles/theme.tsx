import { createTheme, lighten } from "@mui/material";
import { Playwrite_IN, Zain } from "next/font/google";

const playwrite_cursive_font = Playwrite_IN({
  variable: "--font-playwrite-in",
});

const zain_sans_font = Zain({
  variable: "--font-zain",
  subsets: ["latin"],
  weight: "700"
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#46210A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: "1.25rem"
        }
      },
    }
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontFamily: [
        playwrite_cursive_font.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    h2: {
      fontSize: "2.25rem",
      fontFamily: [
        playwrite_cursive_font.style.fontFamily,
        'sans-serif',
      ].join(','),
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 800
    },
    h5: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    body1: {
      fontSize: "1rem"
    },
    fontFamily: [
      zain_sans_font.style.fontFamily,
      'sans',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 425,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920
    },
  },
});


export default theme;