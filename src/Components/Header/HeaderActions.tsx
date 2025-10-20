import React from "react";
import DrawerSidebar from "./DrawerSidebar";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import IconButton from "../ui/IconButton";
import { MoonIcon, SunIcon } from "lucide-react";
import { handleThemeSwitch } from "@/lib/utils";

const HeaderActions = () => {
  const { user, logout } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  if (!user) {
    return (
      <>
        <div className="hidden sm:flex gap-2">
          <Button
            variant="secondary"
            className="rounded-lg"
            onClick={openLogin}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="rounded-lg"
            onClick={openRegister}
          >
            Register
          </Button>
          <IconButton onClick={handleThemeSwitch}>
            <SunIcon className="hidden dark:block" />
            <MoonIcon className="block dark:hidden" />
          </IconButton>
        </div>
        <DrawerSidebar />
      </>
    );
  }

  return (
    <>
      <Link to="/create">
        <Button className="rounded-full text-background bg-primary mr-4 font-semibold text-base">
          Create
        </Button>
      </Link>
      <UserMenu user={user} handleLogoutClick={logout} />
      <DrawerSidebar />
    </>
  );
};

export default HeaderActions;
