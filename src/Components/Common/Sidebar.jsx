import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItem, ListItemText, List } from "@mui/material";

const sidebarItems = [
  { label: "Plans", path: "/plans" },
  { label: "Bookmarked", path: "/bookmarked" },
  { label: "Done", path: "/done" },
  { label: "Profile", path: "/profile" },
];

const Sidebar = () => {
  return (
    <div>
      <Box
        sx={{
          position: "static",
          top: 0,
          left: 0,
          height: "100vh",
          width: "120px",
          bgcolor: "lightgray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: 2,
        }}
      >
        <List>
          {sidebarItems.map((items, id) => (
            <ListItem
              key={id}
              component={Link}
              to={items.path}
              sx={{
                paddingY: 0.5,
                color: "black",
              }}
            >
              <ListItemText primary={items.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};
export default Sidebar;
