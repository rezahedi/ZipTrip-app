import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItem, ListItemText, List } from "@mui/material";

const sidebarItems = [
  { label: "Plans", path: "" },
  { label: "Bookmarked", path: "" },
  { label: "Done", path: "" },
  { label: "Profile", path: "" },
];

const Bookmark = () => {
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          top: "40%",
          left: "7.5%",
          height: "100vh",
          width: "120px",
          bgcolor: "lightgray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: 2,
        }}
      >
        <List sx={{ paddingTop: "60px" }}>
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

export default Bookmark;
