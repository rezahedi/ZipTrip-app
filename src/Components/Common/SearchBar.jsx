import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        transform: "translate( 17%, -50%)",
        // maxWidth: "80%",
        width: "65%",
      }}
    >
      <TextField
        placeholder="Search for a city, activity, or place"
        variant="outlined"
        fullWidth
        size="medium"
        sx={{
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.2)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "40px",
            height: "60px",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
