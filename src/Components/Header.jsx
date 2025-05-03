import React from "react";
import RegisterPage from "./Auth/Register";
import LoginPage from "./Auth/Login";
import AlertDialog from "./Common/AlertDialog";
import SearchBar from "./Common/SearchBar";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickRegisterOpen = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleClickLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.default",
          boxShadow: "none",
          "& .MuiToolbar-root": { padding: 0 },
        }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="h4" color="inherit" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              OneDayPlanner
            </Link>
          </Typography>
          {user ? (
            <>
              <Typography sx={{ mr: "8px", fontSize: "20px" }}>
                {" "}
                👋 Hello, {user.name}!
              </Typography>
              <Button sx={{ minWidth: "6%" }} onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{
                  minWidth: "6%",
                  marginRight: "1%",
                  backgroundColor: "white",
                  color: "#45a049",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#45a049",
                  },
                }}
                onClick={handleClickLoginOpen}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ minWidth: "6%" }}
                onClick={handleClickRegisterOpen}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Register Dialog */}
      <RegisterPage
        open={openRegister}
        handleClose={handleCloseRegister}
        onSwitchToLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
      {/* Login Dialog */}
      <LoginPage
        open={openLogin}
        handleClose={handleCloseLogin}
        onSwitchToRegister={() => {
          setOpenRegister(true);
          setOpenLogin(false);
        }}
      />

      {/* image */}
      <Box
        sx={{
          backgroundImage: "url(/images/main-header.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "230px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="white">
          Plan your perfect day with ease!
        </Typography>
      </Box>

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
    </div>
  );
};

export default Header;
