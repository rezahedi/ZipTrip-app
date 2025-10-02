import React from "react";
import RegisterPage from "../Auth/Register";
import LoginPage from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import SearchBar from "../Common/search/SearchBar";
import { Link } from "react-router-dom";
import { useAuthModal } from "@/context/AuthModalContext";
import HeaderActions from "./HeaderActions";
import Banner from "./Banner";

export const NAV_MENU = [
  { text: "Home", link: "/" },
  { text: "Explore", link: "/map" },
  { text: "About", link: "#" },
];

const Header = ({ withBanner = true }: { withBanner?: boolean }) => {
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
          <ol className="hidden sm:flex gap-1 justify-center text-lg font-semibold [&_a]:px-4 [&_a]:py-2 [&_a]:rounded-full [&_a]:hover:bg-primary/15 [&_a]:transition-all [&_a]:duration-200">
            {NAV_MENU.map((item) => (
              <li>
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
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

      {withBanner && <Banner />}
    </header>
  );
};

export default Header;
