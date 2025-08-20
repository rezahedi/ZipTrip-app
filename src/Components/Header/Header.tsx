import React from "react";
import RegisterPage from "../Auth/Register";
import LoginPage from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import SearchBar from "../Common/search/SearchBar";
import { Link } from "react-router-dom";
import { useAuthModal } from "@/context/AuthModalContext";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const {
    isLoginOpen,
    isRegisterOpen,
    isForgotPasswordOpen,
    closeLogin,
    closeRegister,
    closeForgotPassword,
  } = useAuthModal();

  return (
    <header>
      <div className="bg-background flex items-center py-2">
        <div>
          <Link to="/">
            <img
              src="/images/logo-text-3.png"
              width="140px"
              alt="ZipTrip Logo"
            />
          </Link>
        </div>
        <nav className="grow">
          <ol className="hidden sm:flex gap-8 justify-center text-lg font-semibold">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ol>
        </nav>
        <HeaderActions />
      </div>

      {/* Register Dialog */}
      <RegisterPage open={isRegisterOpen} handleClose={closeRegister} />
      {/* Login Dialog */}
      <LoginPage open={isLoginOpen} handleClose={closeLogin} />
      <ForgotPassword
        open={isForgotPasswordOpen}
        handleClose={closeForgotPassword}
      />

      {/* image */}
      <div className="bg-[url('/images/main-header.jpg')] bg-cover bg-center h-56 flex justify-center items-center">
        <h4 className="text-white text-center text-2xl sm:text-4xl">
          Plan your perfect day with ease!
        </h4>
      </div>

      {/* Search Bar */}
      <SearchBar />
    </header>
  );
};

export default Header;
