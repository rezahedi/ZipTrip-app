import React from "react";
import Header from "./Components/Header";
// import PlanPage from "./Components/Pages/PlanPage";
import Bookmark from "./Components/Pages/Bookmark";
import HomePage from "./Components/Pages/HomePage";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/Auth/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          {/* <Box sx={{ paddingX: "7%" }}>
          <Header />
        </Box> */}

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/myplan" element={<PlanPage />} /> */}
              <Route path="/login" element="" />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgotpassword" element="" />
              <Route path="/resetpassword" element="" />
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
