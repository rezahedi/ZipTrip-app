import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const Stop = ({ name, imageURL, address }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {imageURL && (
        <CardMedia
          component="img"
          image={imageURL}
          alt={name}
          sx={{ width: 220, borderRadius: "10px", objectFit: "cover" }}
        ></CardMedia>
      )}
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{address}</Typography>
      </CardContent>
    </Card>
  );
};

Stop.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  address: PropTypes.string.isRequired,
};

export default Stop;
