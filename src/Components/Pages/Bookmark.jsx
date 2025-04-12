import React from "react";
import BookmarkHeader from "../Common/BookmarkHeader";
import Sidebar from "../Common/Sidebar";
import { Box } from "@mui/material";

const Bookmark = () => {
  return (
    <div>
      <Box sx={{ paddingX: "7%" }}>
        <BookmarkHeader />
        <Sidebar />
      </Box>
    </div>
  );
};
export default Bookmark;
