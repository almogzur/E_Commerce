import { WindowSizeProvider } from '@/context/window_size';
import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from "next/app";



const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: "#d67541" },
    secondary:{main:"#1f252e"},
    warning: { main: "#fdb931" }
  },
  typography: {
    fontFamily: [
      'Rubik Dirt'
    ].join(",")
  },


  components: {

    MuiTypography: {
      defaultProps: {},
      styleOverrides: {
        root: {
          color: "black",



        }
      }

    },
    MuiInputBase: {
      defaultProps: {

      },
      styleOverrides: {
        root: {

        }
      }
    },
    // when in form-control
    MuiInputLabel: {
      defaultProps: {},
      styleOverrides: {
        root: {







        },
      }
    },
    MuiFormControl: {
      defaultProps: {},
      styleOverrides: {
        root: {


        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {
        root: {



        },
      }
    },
    MuiStack: {
      styleOverrides: {
        root: {
          direction: "rtl"
        }
      }
    },
    MuiSelect: {
      defaultProps: {},
      styleOverrides: {
        root: {
        }
      }
    },
    MuiMenuItem: {
      defaultProps: {},
      styleOverrides: {
        root: {
          direction: "rtl",
        }
      },

    },
    MuiButton: {
      defaultProps: { variant: 'text' },
      styleOverrides: {
        root: {
          fontSize: "1em",
          fontWeight: 700,
        },

      }
    },




  },

},
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WindowSizeProvider>
      <Component {...pageProps} />;
      </WindowSizeProvider>
    </ThemeProvider>
  )
}
