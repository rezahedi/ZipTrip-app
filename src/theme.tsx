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
    body2: { fontSize: "0.85rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "#388e3c",
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
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
          "& input": {
            padding: "12px 14px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#BDBDBD",
            borderWidth: "1px",
          },

          //focus
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666666",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
          color: "#666666",
          "&.Mui-focused": {
            color: "#333333",
          },
        },
      },
    },
  },
});

export default theme;
