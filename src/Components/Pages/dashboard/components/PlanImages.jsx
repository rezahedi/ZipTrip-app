import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  IconButton,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const PlanImages = ({ images, setImages }) => {
  const inputRef = useRef(null);

  const handleAddImage = () => {
    if (!inputRef) return;

    setImages([...images, inputRef.current.value]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleDeleteImage = (imageIndex) => {
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    setImages(newImages);
  };

  const handleImageChange = (event) => {
    const index = Number(event.target.dataset.index);
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
        Images *
      </FormLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}
          >
            <TextField
              required
              variant="outlined"
              fullWidth
              placeholder="Enter the full image URL"
              value={image}
              inputProps={{ "data-index": index }}
              onChange={handleImageChange}
            />
            <IconButton
              aria-label="Remove Image"
              onClick={() => handleDeleteImage(index)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          <TextField
            inputRef={inputRef}
            required={images.length === 0}
            variant="outlined"
            fullWidth
            placeholder="Enter the full image URL"
          />
          <IconButton aria-label="Add Image" onClick={handleAddImage}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </FormControl>
  );
};

PlanImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImages: PropTypes.func.isRequired,
};

export default PlanImages;
