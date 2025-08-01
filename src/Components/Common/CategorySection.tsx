import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Avatar, Skeleton } from "@mui/material";
import { fetchPlans } from "@/util";
import { Link } from "react-router-dom";
import { Category } from "@/types";

const CategorySection = ({ title }: { title: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add skeleton loading feature later

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await fetchPlans(`plans/category`, "", setError);
        setCategories(result || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllCategories();
  }, []);

  if (error) return;

  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "#FCFBE2",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {!loading && error && <p>{error}</p>}
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2 }} key={index}>
                <Skeleton variant="circular" width={180} height={180} />
                <Skeleton variant="text" height={30} />
              </Grid>
            ))}
          {categories.map((category) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2 }} key={category._id}>
              <Link
                to={`/category/${category._id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    transition: "0.1s ease-in-out",
                    ":hover": {
                      transform: "scale(1.03)",
                    },
                    ":hover .avatar-hover": {
                      boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Avatar
                    className="avatar-hover"
                    alt={category.name}
                    src={category.imageURL}
                    sx={{
                      borderRadius: "50%",
                      width: 180,
                      height: 180,
                    }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ color: "black" }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategorySection;
