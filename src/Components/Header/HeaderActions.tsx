import React from "react";
import DrawerSidebar from "./DrawerSidebar";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import UserMenu from "./UserMenu";

const HeaderActions = () => {
  const { user, logout } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  const handleLogoutClick = () => {
    logout();
    window.location.reload();
  };

  if (!user) {
    return (
      <>
        <div className="hidden sm:flex">
          <Button variant="secondary" onClick={openLogin}>
            Login
          </Button>
          <Button variant="default" onClick={openRegister}>
            Register
          </Button>
        </div>
        <DrawerSidebar />
      </>
    );
  }

  return (
    <>
      <UserMenu user={user} handleLogoutClick={handleLogoutClick} />
      <DrawerSidebar />
    </>
  );
};

export default HeaderActions;
