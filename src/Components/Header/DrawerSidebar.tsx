import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import {
  Forward,
  Profile,
  PhotoPlus,
  Setting,
  Logout,
  Menu,
  Close,
} from "@/ui/icons";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const DrawerSidebar = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  const { openLogin, openRegister } = useAuthModal();

  // Close the drawer when the route changes
  const location = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [location]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleLogin = () => {
    closeDrawer();
    openLogin();
  };

  const handleRegister = () => {
    closeDrawer();
    openRegister();
  };

  const closeDrawer = () => {
    setSheetOpen(false);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger className="sm:hidden cursor-pointer">
        <span className="sr-only">Open Menu</span>
        <Menu className="w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          "sm:hidden w-full",
          // Hide default close btn!
          "[&>button:last-child]:hidden",
        )}
      >
        <SheetClose className="absolute right-2 top-2 cursor-pointer">
          <span className="sr-only">Close</span>
          <Close className="w-8 my-2 p-0" />
        </SheetClose>
        <SheetHeader className="px-2 py-1.5">
          <SheetTitle>
            <Link to="/">
              <img
                src="/images/logo-text-3.png"
                width="140px"
                alt="ZipTrip Logo"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="grow p-2 mt-4">
          <ol className="flex flex-col gap-1 justify-center text-lg [&_a]:px-2 [&_a]:py-3 [&_a]:hover:bg-primary/15 [&_a]:rounded-md [&_a]:flex [&_a]:items-center [&_a]:gap-2">
            <li>
              <Link to="/">
                <Forward className="w-6 text-ring" /> Home
              </Link>
            </li>
            <li>
              <Link to="/map">
                <Forward className="w-6 text-ring" /> Explore
              </Link>
            </li>
            <li>
              <a href="#">
                <Forward className="w-6 text-ring" /> About
              </a>
            </li>
            {user && (
              <>
                <li className="border-t border-t-primary font-semibold text-2xl p-2 my-2">
                  Account
                </li>
                <li>
                  <Link to="/account/profile">
                    <Profile className="w-6 text-ring" /> Show Profile
                  </Link>
                </li>
                <li>
                  <Link to="/account">
                    <PhotoPlus className="w-6 text-ring" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/account/settings">
                    <Setting className="w-6 text-ring" /> Settings
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleLogout}>
                    <Logout className="w-6 text-ring" /> Logout
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>
        <SheetFooter>
          {!user && (
            <>
              <Button variant="default" onClick={handleRegister}>
                Sign up
              </Button>
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerSidebar;
