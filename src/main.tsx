import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    // {/* </React.StrictMode>, */}
  );
} else {
  throw new Error('Root element with id "root" not found');
}
