import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "@/util";
import { Box, Typography } from "@mui/material";
import PlanDetails from "@/Components/Common/PlanDetails";
import { useAuth } from "@/context/AuthContext";
import { PlanWithStops } from "@/types";

const PlanPage = () => {
  const [plan, setPlan] = useState<PlanWithStops | null>(null);
  const { planId } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSinglePlan = async (planId: string) => {
      try {
        const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/${planId}`;
        const params = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const res = await getData(URL, params);
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
        <PlanDetails plan={plan} />
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
};

export default PlanPage;
