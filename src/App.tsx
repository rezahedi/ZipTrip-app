import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import PlanPage from "@/pages/PlanPage";
import CategoryPage from "@/pages/CategoryPage";
import UserPage from "@/pages/UserPage";
import NotFound404 from "@/pages/404NotFound";
import {
  DashboardTheme,
  MyPlans,
  Bookmarked,
  Done,
  Profile,
  CreateNew,
  EditPlan,
} from "@/pages/dashboard";
import MainLayout from "@/Components/Layout/MainLayout";
import ForgotPassword from "@/Components/Auth/ForgotPassword";
import ResetPassword from "@/Components/Auth/ResetPassword";
import ProtectedRoute from "@/Components/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes wrapped in main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/plans/:planId" element={<PlanPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
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
              <Route path="create" element={<CreateNew />} />
            </Route>
          </Route>
          {/* Standalone 404 route — no layout */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
