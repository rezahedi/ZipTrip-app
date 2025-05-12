import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

const links = [
  { text: "My Plans", path: "/account" },
  { text: "Bookmarked", path: "/account/bookmarked" },
  { text: "Done", path: "/account/done" },
  { text: "Profile", path: "/account/profile" },
];

export default function DashboardTheme() {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          pt: { xs: 3, sm: 3, md: 0 },
          gap: 3,
        }}
      >
        <List
          sx={{
            position: { xs: "auto", sm: "sticky" },
            flex: 1,
            flexGrow: 0,
            alignItems: "stretch",
            top: "0",
            maxHeight: "96vh",
            minHeight: { xs: "auto", sm: "50vh" },
            width: { xs: "100%", sm: "240px" },
            bgcolor: "#eee",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            justifyContent: "start",
          }}
        >
          {links.map((link) => (
            <ListItem
              key={link.text}
              disablePadding
              sx={{ width: { xs: "auto", sm: "200px" } }}
            >
              <NavLink
                to={link.path}
                end
                style={({ isActive }) => ({
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
                <Typography>{link.text}</Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </APIProvider>
  );
}
