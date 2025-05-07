import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PlanCard from "./PlanCard";
import { useAuth } from "../../context/AuthContext";
import PlanCardSkeleton from "./PlanCardSkeleton";
import { fetchPlans } from "../../util";

const CardSection = ({ title, category = "", search = "", size = 4 }) => {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const setError = (errorMessage) => {
    console.log("error", errorMessage);
  };

  // TODO: Add skeleton loading feature later

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await fetchPlans(
          `plans?categoryId=${category}&search=${search}&size=${size}`,
          token,
          setError,
        );
        setLoading(false);

        if (!result || !result.items) return;

        setPlans(result.items);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllPlans();
  }, [token]);

  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "16px", fontWeight: "bold" }}
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
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <PlanCardSkeleton />
              </Grid>
            ))}
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
              <PlanCard
                {...plan}
                planId={plan._id}
                image={plan.images[0]}
                rate={plan.rating}
                distance={`${plan.distance}` + " " + `mi`}
                stopCount={`${plan.stopCount}` + " " + `places`}
                isBookmarked={plan.isBookmarked}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

CardSection.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  search: PropTypes.string,
  size: PropTypes.number,
};

export default CardSection;
