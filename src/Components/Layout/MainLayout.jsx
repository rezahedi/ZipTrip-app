import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";

function MainLayout() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          m: "0 auto",
          pl: { xs: 2, sm: 3 },
          pr: { xs: 2, sm: 3 },
          pb: 5,
          width: "100%",
          maxWidth: "1300px",
          boxSizing: "border-box",
        }}
      >
        <Header />
      </Box>

      <Box
        sx={{
          m: "20px auto",
          pl: { xs: 2, sm: 3 },
          pr: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "1300px",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </>
  );
}

export default MainLayout;
