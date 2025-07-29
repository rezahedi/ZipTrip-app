import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Forward, Profile, PhotoPlus, Setting, Menu, Close } from "@/ui/icons";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const DrawerSidebar = () => {
  const { user, logout } = useAuth();
  return (
    <Sheet>
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
          <ol className="flex flex-col gap-1 justify-center text-lg [&_a]:px-2 [&_a]:py-3 [&_a]:hover:bg-accent [&_a]:rounded-md [&_a]:flex [&_a]:items-center [&_a]:gap-2">
            <li>
              <a href="#">
                <Forward className="w-6 text-ring" /> Home
              </a>
            </li>
            <li>
              <a href="#">
                <Forward className="w-6 text-ring" /> Explore
              </a>
            </li>
            <li>
              <a href="#">
                <Forward className="w-6 text-ring" /> About
              </a>
            </li>
            {user && (
              <>
                <li className="border-t border-t-accent font-semibold text-2xl p-2 my-2">
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
              </>
            )}
          </ol>
        </nav>
        <SheetFooter>
          {!user && (
            <>
              <Button variant="default">Sign up</Button>
              <Button variant="secondary" className="ml-2">
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
