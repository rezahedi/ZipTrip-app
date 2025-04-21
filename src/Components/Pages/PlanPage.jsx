import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../util";
import { Box, Typography } from "@mui/material";
import PlanDetails from "../Common/PlanDetails";

const PlanPage = () => {
  const [plan, setPlan] = useState(null);
  const { planId } = useParams();

  useEffect(() => {
    const fetchSinglePlan = async (planId) => {
      try {
        const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/${planId}`;
        const res = await getData(URL);
        setPlan(res);
      } catch (error) {
        console.error("Error fetching a single plan:", error);
      }
    };

    if (planId) {
      fetchSinglePlan(planId);
    }
  }, [planId]);

  return (
    <Box sx={{ paddingY: 4 }}>
      {plan ? (
        <PlanDetails
          title={plan.title}
          rating={plan.rating}
          type={plan.type}
          distance={plan.distance}
          stopCount={plan.stopCount}
          images={plan.images}
          description={plan.description}
        />
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
};

export default PlanPage;
