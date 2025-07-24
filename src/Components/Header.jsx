import React, { useState } from "react";
import RegisterPage from "./Auth/Register";
import LoginPage from "./Auth/Login";
import AlertDialog from "./Common/AlertDialog";
import SearchBar from "./Common/search/SearchBar";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "./Button";

const Header = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleClickMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

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

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <div className="w-64, p-0.5">
        <List>
          {user ? (
            <>
              <ListItem button onClick={() => navigate("/account")}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button onClick={handleLogoutClick}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={openLogin}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={openRegister}>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );

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
          <div className="grow">
            <Link to="/">
              <img
                src="/images/logo-text-3.png"
                width="140px"
                alt="ZipTrip Logo"
              />
            </Link>
          </div>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              {mobileMenu}
            </>
          ) : user ? (
            <>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/account");
                }}
              >
                {<SpaceDashboardOutlinedIcon sx={{ mr: 0.5 }} />} Dashboard
              </Button>
              <button
                className="max-w-[180px] overflow-hidden text-ellipsis justify-start min-w-[6%] mr-2 bg-white text-inherit hover:bg-white hover:text-inherit"
                onClick={handleClickMenu}
              >
                👋 Hello, {user.name.split(" ")[0]}
                <Avatar
                  className="avatar-hover"
                  alt={user.name}
                  src={user.imageURL}
                  sx={{ width: 24, height: 24, bgcolor: "#4CAF50", ml: 1 }}
                />
                {<ArrowDropDownIcon />}
              </button>
              <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
                // PaperProps={{
                //   sx: { minWidth: 130 },
                // }}
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
                  {<LogoutIcon fontSize="small" sx={{ mr: 1 }} />}
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button type="secondary" onClick={openLogin}>
                Login
              </Button>
              <Button type="primary" onClick={openRegister}>
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
    </div>
  );
};

export default Header;
