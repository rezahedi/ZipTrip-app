import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function MainLayout() {
  return (
    <>
      <div className="relative mx-auto px-2 sm:px-3 pb-5 w-full max-w-[1300px] box-border">
        <Header />
      </div>

      <div className="my-5 mx-auto px-2 sm:px-3 w-full max-w-[1300px] box-border">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default MainLayout;
