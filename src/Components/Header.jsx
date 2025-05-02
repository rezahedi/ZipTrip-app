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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

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
              <Button
                sx={{
                  minWidth: "6%",
                  mr: "8px",
                  backgroundColor: "white",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#inherit",
                  },
                }}
                onClick={() => {
                  navigate("/account");
                }}
              >
                {<PersonIcon />}My Plans
              </Button>
              <Button
                sx={{
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  justifyContent: "flex-start",
                  minWidth: "6%",
                  mr: "8px",
                  backgroundColor: "white",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "inherit",
                  },
                }}
                onClick={handleClickMenu}
              >
                👋 Hello, {user.name.split(" ")[0]}! {<ArrowDropDownIcon />}
              </Button>
              <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
                PaperProps={{
                  sx: { minWidth: 130 },
                }}
              >
                <MenuItem
                  sx={{
                    minHeight: "32px",
                    fontSize: "0.9rem",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                  onClick={handleLogoutClick}
                >
                  {<LogoutIcon fontSize="small" />}
                  Logout
                </MenuItem>
              </Menu>
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
