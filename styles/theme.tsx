import { alpha, createTheme, darken, lighten } from "@mui/material";
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
    secondary: {
      main: "#ffffff"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: "1.25rem",
          variants: [
            {
              props: { variant: "flipped" },
              style: {
                  '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.8),
                  },
                  backgroundColor: '#ffffff',
                  color: '#46210A',
              }
          },
          ]
        }
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          '& .MuiAlertTitle-root': {
          fontSize: "1.25rem",
          margin: "0.05rem 0 0.25rem 0"
        }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: [
            zain_sans_font.style.fontFamily,
            'sans',
          ].join(','),
        }
      }
    }
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
     
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