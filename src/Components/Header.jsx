import React, { useState } from "react";
import RegisterPage from "./Auth/Register";
import LoginPage from "./Auth/Login";
import AlertDialog from "./Common/AlertDialog";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";

const Header = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
                onClick={openLogin}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ minWidth: "6%" }}
                onClick={openRegister}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

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
      <Box
        sx={{
          position: "absolute",
          transform: "translate( 17%, -50%)",
          // maxWidth: "80%",
          width: "65%",
        }}
      >
        <TextField
          placeholder="Search for a city, activity, or place"
          variant="outlined"
          fullWidth
          size="medium"
          sx={{
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.2)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              height: "60px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
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
