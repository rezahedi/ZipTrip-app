import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Paper,
  ImageList,
  ImageListItem,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

const PlanDetails = ({
  title,
  rating,
  type,
  distance,
  stopCount,
  images,
  description,
}) => {
  return (
    <>
      {/* Plan Card */}
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          borderRadius: 4,
        }}
      >
        {/* Icon Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}
        >
          <FavoriteBorderIcon sx={{ cursor: "pointer", color: "#424242" }} />
          <ShareIcon sx={{ cursor: "pointer", color: "#424242" }} />
          <BookmarkBorderIcon sx={{ cursor: "pointer", color: "#424242" }} />
        </Box>

        {/* Title */}
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        {/* Title Details */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            {rating}⭐
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${type}`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${distance} miles`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${stopCount} places`}</Typography>
        </Box>
      </Paper>

      {/* Image List */}
      {images?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 4,
          }}
        >
          <ImageList
            sx={{
              width: 500,
              height: 450,
            }}
            cols={2}
            rowHeight={200}
          >
            {images.map((url, index) => (
              <ImageListItem key={index}>
                <img src={url} alt={`Plan image ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      {/* Description */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </>
  );
};

export default PlanDetails;

PlanDetails.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.number,
  type: PropTypes.string,
  distance: PropTypes.number,
  stopCount: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};
