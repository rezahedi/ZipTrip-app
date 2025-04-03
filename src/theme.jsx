import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    secondary: { main: "#333333" },
    background: { default: "#FFFFFF", paper: "#FFFFFF" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.75rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "#45a049",
          },
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;
