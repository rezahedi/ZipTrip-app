import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";

const EmptyResultMessage = () => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Found nothing! Try something more general to get better result in your
        search!
      </Typography>
      <CardMedia
        component="img"
        image="/images/welcome_search.webp"
        alt="Searching"
        title="Illustrated by Sushama Patel, Source: https://dribbble.com/shots/14285317-searching"
        sx={{
          margin: "10px auto",
          maxWidth: 600,
          width: { sm: "80%", xs: "100%" },
          height: "auto",
        }}
      />
    </Box>
  );
};

export default EmptyResultMessage;
