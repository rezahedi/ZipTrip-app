import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PlanCard = ({ image, title, rate, type, distance, stopCount }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        height="195"
        alt={title}
        sx={{ borderRadius: "10px", objectFit: "cover" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          backgroundColor: "transparent",
        }}
      >
        <Typography>{title}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            gap: 1,
          }}
        >
          <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
            {rate}⭐
          </Typography>
          <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
            {type}
          </Typography>
          <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
            {distance}
          </Typography>
          <Typography sx={{ color: "#B0B0B0", fontSize: "12px" }}>
            {stopCount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;

PlanCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  stopCount: PropTypes.number.isRequired,
};
