import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import {
  getPlan,
  updatePlan,
  getCategories,
  PassingPlan,
  PassingStop,
} from "@/util/dashboard";
import { useAuth } from "@/context/AuthContext";
import PlanImages from "./components/PlanImages";
import Stops from "./components/Stops";
import { Category } from "@/types";

const TYPES = ["Full day", "Half day", "Night"];

function EditPlan() {
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
  const [error, setError] = useState<string | null>(null);
  const { planId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPlanExists, setIsPlanExists] = useState<boolean>(false);
  const { token, user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
      return;
    }
    if (!planId) {
      navigate("/account");
      return;
    }

    (async () => {
      setIsLoading(true);
      const data = await getPlan(token, planId, setError);
      if (!data) return setIsPlanExists(false);
      setIsPlanExists(true);

      const categoriesData = await getCategories(token, setError);
      if (!categoriesData) return;

      setPlan({
        ...data,
        categoryId: data.categoryId?._id,
      });
      setCategories(categoriesData);
      setIsLoading(false);
    })();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const result = await updatePlan(token, plan, setError);
    if (!result) return;

    navigate("/account");
  };

  if (!isLoading && !isPlanExists)
    return (
      <Typography color="error">
        Plan not found or does not exist. Please go back to{" "}
        <Link to="/account">your plans</Link>.
      </Typography>
    );

  if (isLoading) return <div>Loading ...</div>;

  return (
    <>
      <div className="mt-0.5">
        <h4>Edit Plan:</h4>
      </div>
      <div className="w-full max-w-2xl">
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

          {/* Image */}
          <PlanImages
            images={plan.images || []}
            setImages={(images: string[]) => setPlan({ ...plan, images })}
          />

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

          <div className="flex flex-row gap-0.5">
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
          </div>

          {/* Stops */}
          <Stops
            stops={plan.stops || []}
            setStops={(stops: PassingStop[]) => setPlan({ ...plan, stops })}
          />

          <div className="flex justify-end gap-0.5">
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
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPlan;
