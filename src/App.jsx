import React from "react";
import Header from "./Components/Header";
import Bookmark from "./Components/Pages/Bookmark";
import HomePage from "./Components/Pages/HomePage";
import {
  DashboardTheme,
  MyPlans,
  Bookmarked,
  Done,
  Profile,
  CreateNew,
  EditPlan,
} from "./Components/Pages/dashboard";
import PlanPage from "./Components/Pages/PlanPage";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
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
              <Route path="/plans/:planId" element={<PlanPage />} />
              <Route path="/forgotpassword" element="" />
              <Route path="/resetpassword" element="" />
              <Route path="/bookmark" element={<Bookmark />} />

              <Route path="/account/" element={<DashboardTheme />}>
                <Route index element={<MyPlans />} />
                <Route path=":planId" element={<EditPlan />} />
                <Route path="bookmarked" element={<Bookmarked />} />
                <Route path="done" element={<Done />} />
                <Route path="profile" element={<Profile />} />
                <Route path="create" element={<CreateNew />} />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
