import React, { useEffect, useState } from "react";
import PlanCard from "../Common/PlanCard";
import { Box, Grid } from "@mui/material";
import { getData } from "../../util";
import CardSection from "../Common/CardSection";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`;

const HomePage = () => {
  const [plans, setPlans] = useState([]);

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
    <>
      <Box>
        <CardSection title="City Exploration Best Plans" category="680819f66e7cdbc049ab3f57" />
        <CardSection title="Local Favorites Near San Francisco" search="san francisco" />

        <Grid container spacing={3}>
          {plans.map((plan) => {
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
                <PlanCard
                  image={plan.images[0]}
                  title={plan.title}
                  rate={plan.rating}
                  type={plan.type}
                  distance={`${plan.distance}` + " " + `mi`}
                  stopCount={`${plan.stopCount}` + " " + `places`}
                  planId={plan._id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
