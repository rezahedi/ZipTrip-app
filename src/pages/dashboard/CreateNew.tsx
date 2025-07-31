import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  getCategories,
  createPlan,
  PassingPlan,
  PassingStop,
} from "@/util/dashboard";
import { useAuth } from "@/context/AuthContext";
import PlanImages from "./components/PlanImages";
import Stops from "./components/Stops";
import { Category } from "@/types";

const TYPES = ["Full day", "Half day", "Night"];

function CreateNew() {
  const [plan, setPlan] = useState<PassingPlan>({
    title: "",
    description: "",
    images: [],
    stops: [],
    type: "",
    distance: "",
    duration: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // TODO: Switch image URLs with actual multiple image upload feature.

  useEffect(() => {
    // FIXME: Instead of just redirecting user to home, show a not authorized message with login button or redirect to login page
    if (!token || !user) {
      navigate("/");
      return;
    }

    (async () => {
      const categoriesData = await getCategories(token, setError);

      if (!categoriesData) return;

      setCategories(categoriesData);
    })();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // A random number with one decimal greater than 0 and less than 5
    const rate = Math.round(Math.random() * 49 + 1) / 10;
    // A random number between 0 and 100
    const reviewCount = Math.floor(Math.random() * 100);
    // Adding fake review data to the plan
    const extendedPlan = {
      ...plan,
      rate,
      reviewCount,
    };
    const result = await createPlan(token, extendedPlan, setError);
    if (!result) return;

    navigate("/account");
  };

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4">Create a New Plan:</Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 650 }}>
        {error && <p>{error}</p>}
        <form onSubmit={handleCreate}>
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

          {/* Image */}
          <PlanImages
            images={plan.images || []}
            setImages={(images: string[]) => setPlan({ ...plan, images })}
          />

          {/* Category */}
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
              onChange={(e) =>
                setPlan({ ...plan, description: e.target.value })
              }
            />
          </FormControl>

          {/* Type */}
          <FormControl fullWidth margin="normal">
            <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
              Type
            </FormLabel>
            <Select
              variant="outlined"
              fullWidth
              value={plan.type || ""}
              onChange={(e) => setPlan({ ...plan, type: e.target.value })}
            >
              <MenuItem value="">Select a plan type</MenuItem>
              {TYPES.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            {/* Distance */}
            <FormControl fullWidth margin="normal">
              <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
                Distance
              </FormLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Distance in miles"
                type="number"
                value={plan.distance || ""}
                onChange={(e) => setPlan({ ...plan, distance: e.target.value })}
              />
            </FormControl>

            {/* Duration */}
            <FormControl fullWidth margin="normal">
              <FormLabel sx={{ fontWeight: "bold", mb: 1, color: "#000" }}>
                Duration
              </FormLabel>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Duration in hours"
                type="number"
                value={plan.duration || ""}
                onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
              />
            </FormControl>
          </Box>

          {/* Stops */}
          <Stops
            stops={plan.stops || []}
            setStops={(stops: PassingStop[]) => setPlan({ ...plan, stops })}
          />

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
              Publish
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default CreateNew;
