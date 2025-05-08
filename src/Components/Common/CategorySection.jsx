import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Avatar, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { fetchPlans } from "../../util";
import { Link } from "react-router-dom";

const CategorySection = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Add skeleton loading feature later

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await fetchPlans(
          `plans/category`,
          '',
          setError,
        );
        setCategories(result || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        bgcolor: "#FCFBE2",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
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
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
                <Skeleton variant="circular" width={180} height={180} />
                <Skeleton variant="text" height={30} />
              </Grid>
            ))}
          {categories.map((category) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={category._id}>
              <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                <Link to={`/category/${category._id}`}>
                  <Avatar
                    alt={category.name}
                    src={category.imageURL}
                    sx={{
                      borderRadius: "50%",
                      width: 180,
                      height: 180,
                      cursor: "pointer",
                    }}
                  />
                  <Typography variant="h6" align="center">
                    {category.name}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

CategorySection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CategorySection;
