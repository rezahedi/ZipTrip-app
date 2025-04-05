import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.default",
          boxShadow: "none",
          "& .MuiToolbar-root": { padding: 0 },
        }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="h4" color="inherit" style={{ flexGrow: 1 }}>
            OneDayPlanner
          </Typography>
          <Button
            sx={{
              minWidth: "6%",
              marginRight: "1%",
              backgroundColor: "white",
              color: "#45a049",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
                color: "#45a049",
              },
            }}
          >
            Login
          </Button>
          <Button color="inherit" sx={{ minWidth: "6%" }}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* image */}
      <Box
        sx={{
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/0cf9/b967/5f7578c574ee3138e46a9d9b309a3e20?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RtXfDQQy9kJOrv-aWOgd4Yo-Ugk5ypOSJiC2vvX~rOZG5MUIjBvQ06MWY7viqdFCuTopC-5Qeum6deWkFGwXhoN-w0kW5d0lOxC4y-Z5l3nAGj4QAowEDeEJXsfPfNzxg3HBd8ruXTEXGT2g5iZZObmAO9TS8FH1AHtMqh~QGG8Wtv4EJkiS1C5Q9E-8JgniY3CpwPM7vX~ooAVQva3nYeolDy30Qqpcqs2CAAIFjl7kTqal3w0xfAQo2vZNx7pVRJsA65oCcjkXcjGJz2prMNm3tLXqG9jVyfJx3MD5AwxI9K7owyHE5Alm~KDKAyfACLKBv5LV6p8XMIJu4zug5A__)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "230px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="white">
          Plan your perfect day with ease!
        </Typography>
      </Box>

      {/* Search Bar */}
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
    </div>
  );
};

export default Header;
