import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MapDialog from "./MapDialog";
import StopDialog from "./StopDialog";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const Stops = ({ stops, setStops }) => {
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  const handleDeleteStop = (stopIndex) => {
    const newStops = [...stops];
    newStops.splice(stopIndex, 1);
    setStops(newStops);
  };

  const handleStopChange = (event) => {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const newStops = [...stops];
    newStops[index][type] = event.target.value;
    setStops(newStops);
  };

  const handleOpenMap = () => {
    setIsMapDialogOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapDialogOpen(false);
  };

  const handleAddPlaceConfirm = (stop) => {
    setStops([...stops, stop]);
    setIsMapDialogOpen(false);
  };

  const handleOpenStop = () => {
    setIsStopDialogOpen(true);
  };
  const handleCloseStop = () => {
    setIsStopDialogOpen(false);
  };
  const handleAddManuallyConfirm = (stop) => {
    setStops([...stops, stop]);
    setIsStopDialogOpen(false);
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
        Stops *
      </FormLabel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {stops.map((stop, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              padding: 2,
            }}
          >
            <img
              src={stop.imageURL}
              alt={stop.name}
              style={{ width: "100px", height: "100px" }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the name"
                value={stop.name}
                inputProps={{ "data-index": index, "data-type": "name" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the image URL"
                value={stop.imageURL}
                inputProps={{ "data-index": index, "data-type": "imageURL" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
              <TextField
                required
                variant="outlined"
                fullWidth
                placeholder="Enter the address"
                value={stop.address}
                inputProps={{ "data-index": index, "data-type": "address" }}
                onChange={handleStopChange}
                sx={{ "& input": { background: "white", padding: "6px 12px" } }}
              />
            </Box>
            <IconButton
              aria-label="Remove Stop"
              onClick={() => handleDeleteStop(index)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Button
            onClick={handleOpenMap}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              width: 120,
            }}
          >
            <MapOutlinedIcon />
            Google Map
          </Button>
          <Button
            onClick={handleOpenStop}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              width: 120,
            }}
          >
            <FormatColorTextOutlinedIcon />
            Manually
          </Button>
          <Button
            onClick={handleOpenStop}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              width: 120,
              backgroundColor: "#cfcfcf",
            }}
            disabled
          >
            <NotesOutlinedIcon />
            Add Note
          </Button>
          <Button
            onClick={handleOpenStop}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              width: 120,
              backgroundColor: "#cfcfcf",
            }}
            disabled
          >
            <AddPhotoAlternateOutlinedIcon />
            Add Photos
          </Button>
        </Box>
      </Box>
      <MapDialog
        isOpen={isMapDialogOpen}
        onClose={handleCloseMap}
        onConfirm={handleAddPlaceConfirm}
      />
      <StopDialog
        isOpen={isStopDialogOpen}
        onClose={handleCloseStop}
        onConfirm={handleAddManuallyConfirm}
      />
    </FormControl>
  );
};

Stops.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStops: PropTypes.func.isRequired,
};

export default Stops;
