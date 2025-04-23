import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  FormLabel,
} from "@mui/material";
import { AddLocation, Map, NoteAdd, PhotoCamera } from "@mui/icons-material";

const createPlan = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 650 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Create Your Plan
      </Typography>

      {/* Title */}
      <FormControl fullWidth margin="normal">
        <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
          Title
        </FormLabel>
        <TextField
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333",
              },
            },
          }}
        />
      </FormControl>

      {/* Category */}
      <FormControl fullWidth margin="normal">
        <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
          Category
        </FormLabel>
        <TextField
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333",
              },
            },
          }}
        />
      </FormControl>

      {/* Description */}
      <FormControl fullWidth margin="normal">
        <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
          Description
        </FormLabel>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#333",
              },
            },
          }}
        />
      </FormControl>

      {/* Add Your Start Point */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" mb={2}>
          Add your Start Point
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AddLocation />}
            >
              Manually
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant="outlined" startIcon={<Map />}>
              From Map
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant="outlined" startIcon={<NoteAdd />}>
              Add Note
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PhotoCamera />}
            >
              Add Photos
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Info Text Centered */}
      <Typography
        variant="caption"
        sx={{
          color: "gray",
          display: "block",
          mb: 2,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Add at least 5 points or stops or activities before publishing!
      </Typography>

      {/* Buttons Right Aligned */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: "#333" }}>
          Publish
        </Button>
      </Box>
    </Box>
  );
};

export default createPlan;
