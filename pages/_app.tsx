import '@/styles/globals.css'
import { WindowSizeProvider } from '@/context/window_size';
import { ProductProvider } from '@/context/product_context';
import { createTheme, ThemeProvider } from '@mui/material';
import { CartProvider } from '@/context/cart_context';
import type { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    primary: { main: "#d67541" },
    secondary: { main: "#1f252e" },
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
        root: {color: "black",}
      }
    },
    MuiInputBase: {
      defaultProps: {},
      styleOverrides: {root: {}}
    },
    // when in form-control
    MuiInputLabel: {
      defaultProps: {},
      styleOverrides: {root: {}}
    },
    MuiFormControl: {
      defaultProps: {},
      styleOverrides: {root: {}}
    },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {root: {} }
    },
    MuiStack: {
      styleOverrides: { root: {}}
    },
    MuiSelect: {
      defaultProps: {},
      styleOverrides: {root: {}}
    },
    MuiMenuItem: {
      defaultProps: {},
      styleOverrides: {root: {}},
    },
    MuiButton: {
      defaultProps: { variant: 'text' },
      styleOverrides: {
        root: {
          fontSize: "1em",
          fontWeight: 700,
        },
      }},
  },
},
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WindowSizeProvider>
        <CartProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
        </CartProvider>
      </WindowSizeProvider>
    </ThemeProvider>
  )
}
