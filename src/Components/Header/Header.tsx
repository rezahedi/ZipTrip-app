import React, { useState } from "react";
import RegisterPage from "../Auth/Register";
import LoginPage from "../Auth/Login";
import AlertDialog from "../Common/AlertDialog";
import SearchBar from "../Common/search/SearchBar";
import { useMediaQuery, useTheme } from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuthModal } from "@/context/AuthModalContext";
import { Button } from "@/Components/ui/button";
import UserMenu from "./UserMenu";
import DrawerSidebar from "./DrawerSidebar";

const Header = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeLogin,
    closeRegister,
  } = useAuthModal();

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
    window.location.reload();
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

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

        {isMobile ? (
          <DrawerSidebar />
        ) : user ? (
          <>
            <Button
              variant="default"
              onClick={() => {
                navigate("/account");
              }}
            >
              {<SpaceDashboardOutlinedIcon sx={{ mr: 0.5 }} />} Dashboard
            </Button>
            <UserMenu user={user} handleLogoutClick={handleLogoutClick} />
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={openLogin}>
              Login
            </Button>
            <Button variant="default" onClick={openRegister}>
              Register
            </Button>
          </>
        )}
      </div>

      {/* Register Dialog */}
      <RegisterPage
        open={isRegisterOpen}
        handleClose={closeRegister}
        onSwitchToLogin={() => {
          closeRegister();
          openLogin();
        }}
      />
      {/* Login Dialog */}
      <LoginPage
        open={isLoginOpen}
        handleClose={closeLogin}
        onSwitchToRegister={() => {
          openRegister();
          closeLogin();
        }}
      />

      {/* image */}
      <div className="bg-[url('/images/main-header.jpg')] bg-cover bg-center h-56 flex justify-center items-center">
        <h4 className="text-white text-center text-2xl sm:text-4xl">
          Plan your perfect day with ease!
        </h4>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Alert Dialog for Logout */}
      <AlertDialog
        isOpen={openLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        cancelText="Cancel"
      />
    </header>
  );
};

export default Header;
