import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import ExplorePage from "@/pages/ExplorePage";
import PlanPage from "@/pages/PlanPage";
import UserPage from "@/pages/UserPage";
import NotFound404 from "@/pages/404NotFound";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import {
  DashboardTheme,
  MyPlans,
  Bookmarked,
  Done,
  Profile,
  Settings,
} from "@/pages/dashboard";
import MainLayout from "@/Components/Layout/MainLayout";
import MapLayout from "@/Components/Layout/MapLayout";
import ProtectedRoute from "@/Components/Auth/ProtectedRoute";
import CreatePage from "@/pages/dashboard/create";
import CityPage from "./pages/CityPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MapLayout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<CreatePage />} />
              <Route path="/create/:planId" element={<CreatePage />} />
            </Route>
          </Route>

          {/* Routes wrapped in main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/plans/:planId" element={<PlanPage />} />
            <Route path="/city/:cityId" element={<CityPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPasswordPage />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<DashboardTheme />}>
                <Route index element={<MyPlans />} />
                <Route path="bookmarked" element={<Bookmarked />} />
                <Route path="done" element={<Done />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
