import React from "react";
import { Box, Typography, FormControl, FormLabel, TextField, Button } from "@mui/material";

function EditPlan() {
  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4">Edit Plan:</Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 650 }}>
      
        {/* Title */}
        <FormControl fullWidth margin="normal">
          <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
            Title
          </FormLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter the title of your plan"
          />
        </FormControl>

        {/* Category */}
        {/* TODO: Replace it with a select dropdown */}
        <FormControl fullWidth margin="normal">
          <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
            Category
          </FormLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Select a category for your plan"
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
            placeholder="Write a brief description of your plan"
            minRows={4}
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" sx={{ backgroundColor: "white", color: "#4CAF50", borderColor: "#4CAF50", ":hover": { backgroundColor: "#388e3c30", borderColor: "#388e3c"} }}>Cancel</Button>
          <Button variant="contained" color="primary">Publish</Button>
        </Box>
      </Box>
    </>
  );
}

export default EditPlan;
