import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

const links = [
  { text: "My Plans", path: "/account" },
  { text: "Bookmarked", path: "/account/bookmarked" },
  { text: "Done", path: "/account/done" },
  { text: "Profile", path: "/account/profile" },
  { text: "Settings", path: "/account/settings" },
];

export default function DashboardTheme() {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <div className="block sm:flex gap-3 pt-2">
        <div className="flex-1 grow-0 sm:sticky items-stretch top-0 max-h-[96vh] min-h-auto sm:min-h-[50vh] w-full sm:w-3xs flex bg-foreground/10 sm:flex-col justify-start">
          {links.map((link) => (
            <div key={link.text} className="block w-auto sm:w-52">
              <NavLink
                to={link.path}
                end
                style={({ isActive }) => ({
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  textDecoration: "none",
                  color: isActive ? "white" : "inherit",
                  backgroundColor: isActive ? "#4CAF50" : "transparent",
                  borderLeft: isActive
                    ? "4px solid #388e3c"
                    : "4px solid transparent",
                })}
              >
                {link.text}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="grow pt-2">
          <Outlet />
        </div>
      </div>
    </APIProvider>
  );
}
