import React from "react";
import PropTypes from "prop-types";
import Stop from "./Stop";
import { Box, Typography } from "@mui/material";

const Stops = ({ stops }) => {
  return (
    <Box sx={{ width: { md: 760, xs: "100%" } }}>
      <Typography variant="h4">Activities</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Start Point</Typography>
        {stops.map((stop, index) => (
          <Stop key={index} {...stop} />
        ))}
        <Typography variant="h5">Finish Point</Typography>
      </Box>
    </Box>
  );
};

Stops.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Stops;
