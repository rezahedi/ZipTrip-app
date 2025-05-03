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
          paddingX: "7%",
          position: "relative",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Header />
      </Box>

      <Box sx={{ paddingX: "7%", paddingTop: "4%" }}>
        <Outlet />
      </Box>

      <Footer />
    </>
  );
}

export default MainLayout;
