
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000", 
    },
    secondary: {
      main: "#ffffff", 
    },
    background: {
      default: "#121212", 
      paper: "#1e1e1e", 
    },
    text: {
      primary: "#ffffff", 
      secondary: "#cccccc", 
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiInputBase: {
      // Targeting the base input element for general autofill and filled/standard variants
      styleOverrides: {
        input: {
          // General override for browser autofill background color
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #1e1e1e inset !important", // Use paper background color with !important
          },
        },
      },
    },
  },
});

export default darkTheme;
