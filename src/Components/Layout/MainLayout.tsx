import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="relative mx-auto px-2 sm:px-3 w-full max-w-[1300px] box-border">
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        >
          <Header />
        </GoogleOAuthProvider>
      </div>

      <div className="my-5 mx-auto px-2 sm:px-3 w-full max-w-[1300px] box-border">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
