import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PlanCard from "./PlanCard";
import { getData } from "../../util";

const CardSection = ({ title, category = "", search = "", size = 4 }) => {
  const [plans, setPlans] = useState([]);
  const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans?categoryId=${category}&search=${search}&size=${size}`;

  // TODO: Add skeleton loading feature later

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const res = await getData(URL);
        setPlans(res?.items || []);
        console.log(res);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllPlans();
  }, []);

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
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
              <PlanCard {...plan} planId={plan._id} image={plan.images[0]} />
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
