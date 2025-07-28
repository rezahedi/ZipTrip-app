import React from "react";
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
import { Menu } from "@/ui/icons";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const DrawerSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          "w-full sm:max-w-sm h-full inset-y-0 right-0 border-l",
          // 1. Kill transform from slide-in/out
          "!transform-none !translate-x-0 !transition-none",
          // 2. Your fade animation
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:fade-out-0",
        )}
      >
        <SheetClose className="absolute right-2 top-2">
          <span className="sr-only">Close</span>
          <svg
            className="size-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <ol className="flex flex-col gap-4 justify-center text-xl font-semibold">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
          </ol>
        </nav>
        <SheetFooter>
          <Button variant="default">Sign up</Button>
          <Button variant="secondary" className="ml-2">
            Login
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerSidebar;
