import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  ImageList,
  ImageListItem,
  IconButton,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import StopsOnMap from "./StopsOnMap";
import { Link } from "react-router-dom";
import Stops from "./Stops";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { AddBookmark, removeBookmark } from "@/util/dashboard";
import { PlanWithStops } from "@/types";

const PlanDetails = ({ plan }: { plan: PlanWithStops }) => {
  const {
    _id: planId,
    title,
    description,
    images,
    stops,
    type,
    stopCount,
    distance,
    duration,
    categoryId,
    userId,
    rate,
    reviewCount,
    isBookmarked,
  } = plan;
  const [bookmark, setBookmark] = useState(isBookmarked);
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) return openLogin();

    if (bookmark) {
      const result = await removeBookmark(token, planId, setError);
      if (result) {
        setBookmark(false);
      }
    } else {
      const result = await AddBookmark(token, planId, setError);
      if (result) {
        setBookmark(true);
      }
    }
  };

  const setError = (errorMessage: string) => {
    console.log("error", errorMessage);
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          {/* Title */}
          <Typography variant="h4">{title}</Typography>

          {/* Icon Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flex: { xs: "1 1 100%", sm: "unset" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton disabled>
              <FavoriteBorderIcon
                sx={{ cursor: "pointer", color: "#424242" }}
              />
            </IconButton>
            <IconButton disabled>
              <ShareIcon sx={{ cursor: "pointer", color: "#424242" }} />
            </IconButton>
            <IconButton onClick={handleBookmark}>
              {bookmark ? (
                <BookmarkIcon style={{ cursor: "pointer", color: "orange" }} />
              ) : (
                <BookmarkBorderIcon
                  sx={{ cursor: "pointer", color: "#424242" }}
                />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* Title Details */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, rowGap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#616161",
              fontSize: { xs: "14px", sm: "15px" },
              display: "flex",
              gap: 0.5,
            }}
          >
            Created by{" "}
            <Link
              to={`/user/${userId._id}`}
              style={{ display: "flex", gap: "4px" }}
            >
              <Avatar
                className="avatar-hover"
                alt={userId.name}
                src={userId.imageURL}
                sx={{ width: 24, height: 24, bgcolor: "#4CAF50" }}
              />
              {userId.name}
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            {rate}⭐ ({reviewCount} reviews)
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: { xs: "14px", sm: "15px" } }}
          >{`${type}`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: { xs: "14px", sm: "15px" } }}
          >{`${distance} miles`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: { xs: "14px", sm: "15px" } }}
          >{`${stopCount} places`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >{`${duration} hours`}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#616161", fontSize: "15px" }}
          >
            <Link to={`/category/${categoryId._id}`}>{categoryId.name}</Link>
          </Typography>
        </Box>
      </Paper>

      {/* Image List */}
      {images?.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr" },
            gap: 4,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          <StopsOnMap stops={stops} />
          <ImageList
            sx={{
              m: 0,
              width: "100%",
              height: { xs: 300, sm: 450 },
            }}
            cols={1}
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

      {/* Stops Section */}
      {stops.length > 0 && <Stops stops={stops} />}
    </>
  );
};

export default PlanDetails;
