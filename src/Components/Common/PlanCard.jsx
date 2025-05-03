import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlanCard = ({
  image,
  title,
  rate,
  type,
  distance,
  stopCount,
  planId,
}) => {
  return (
    <Link
      to={`/plans/${planId}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Card sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 1,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              backgroundColor: "white",
              width: 35,
              height: 35,
              marginTop: 1,
            }}
          >
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          image={image}
          height="195"
          alt={title}
          sx={{ borderRadius: "10px", objectFit: "cover" }}
        ></CardMedia>
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
    </Link>
  );
};

export default PlanCard;

PlanCard.propTypes = {
  planId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number,
  type: PropTypes.string,
  distance: PropTypes.string,
  stopCount: PropTypes.string,
};
