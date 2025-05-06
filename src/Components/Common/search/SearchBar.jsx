import React, { useState, useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { getQueryValue } from "../../../util/url";

const SearchBar = () => {
  const location = useLocation();
  let q = getQueryValue(location.search, "q");
  const [searchQuery, setSearchQuery] = useState(q);
  const navigate = useNavigate();

  useEffect(() => {
    q = getQueryValue(location.search, "q");
    setSearchQuery(q);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery) return;

    navigate(`/search?q=${searchQuery}`);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSearchQuery("");
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        transform: "translate( 17%, -50%)",
        // maxWidth: "80%",
        width: "65%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Search for a city, activity, or place"
          variant="outlined"
          fullWidth
          size="medium"
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                  <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              ...(q && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCancel}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            },
          }}
        />
      </form>
    </Box>
  );
};

export default SearchBar;
