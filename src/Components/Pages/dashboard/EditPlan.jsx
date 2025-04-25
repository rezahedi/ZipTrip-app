import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { getPlan, updatePlan, getCategories } from "../../../util/dashboard";

function EditPlan() {
  const [plan, setPlan] = useState({});
  const [error, setError] = useState(null);
  const { planId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!planId) return;

    (async () => {
      const data = await getPlan(planId, setError);
      const categoriesData = await getCategories(setError);

      if (!data || !categoriesData) return;

      setPlan({
        ...data,
        categoryId: data.categoryId?._id,
        userId: data.userId?._id,
      });
      setCategories(categoriesData);
    })();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updatePlan(plan, setError);
    if (!result) return;

    navigate("/account");
  };

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4">Edit Plan:</Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 650 }}>
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdate}>
          {/* Title */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
              Title *
            </FormLabel>
            <TextField
              required
              variant="outlined"
              fullWidth
              placeholder="Enter the title of your plan"
              value={plan.title || ""}
              onChange={(e) => setPlan({ ...plan, title: e.target.value })}
            />
          </FormControl>

          {/* Category */}
          {/* TODO: Replace it with a select dropdown */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
              Category *
            </FormLabel>
            <Select
              required
              variant="outlined"
              fullWidth
              value={plan.categoryId || ""}
              onChange={(e) => setPlan({ ...plan, categoryId: e.target.value })}
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Description */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
              Description *
            </FormLabel>
            <TextField
              required
              variant="outlined"
              fullWidth
              multiline
              placeholder="Write a brief description of your plan"
              minRows={4}
              value={plan.description || ""}
              onChange={(e) => setPlan({ ...plan, description: e.target.value })}
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#4CAF50",
                borderColor: "#4CAF50",
                ":hover": {
                  backgroundColor: "#388e3c30",
                  borderColor: "#388e3c",
                },
              }}
              onClick={() => navigate("/account")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default EditPlan;
