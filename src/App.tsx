import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import MapViewPage from "@/pages/MapView";
import PlanPage from "@/pages/PlanPage";
import CategoryPage from "@/pages/CategoryPage";
import UserPage from "@/pages/UserPage";
import NotFound404 from "@/pages/404NotFound";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import {
  DashboardTheme,
  MyPlans,
  Bookmarked,
  Done,
  Profile,
  CreateNew,
  EditPlan,
  Settings,
} from "@/pages/dashboard";
import MainLayout from "@/Components/Layout/MainLayout";
import MapLayout from "@/Components/Layout/MapLayout";
import ProtectedRoute from "@/Components/Auth/ProtectedRoute";
import CreatePage from "@/pages/dashboard/create";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MapLayout />}>
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/create" element={<CreatePage />} />
          </Route>
          {/* Routes wrapped in main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/plans/:planId" element={<PlanPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route
              path="/resetpassword/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <DashboardTheme />
                </ProtectedRoute>
              }
            >
              <Route index element={<MyPlans />} />
              <Route path=":planId" element={<EditPlan />} />
              <Route path="bookmarked" element={<Bookmarked />} />
              <Route path="done" element={<Done />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create" element={<CreateNew />} />
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
