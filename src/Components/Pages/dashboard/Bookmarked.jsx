import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteBookmarkedPlan,
  getBookmarkedPlan,
} from "../../../util/dashboard";
import PlanCard from "../../Common/PlanCard";
import { Box, Grid, Button, Typography } from "@mui/material";
import AlertDialog from "../../Common/AlertDialog";
import { useAuth } from "../../../context/AuthContext";

function Bookmarked() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedPlanToRemove, setSelectedPlanToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // FIXME: Instead of just redirecting user to home, show a not authorized message with login button or redirect to login page
    if (!token) return navigate("/");

    (async () => {
      const data = await getBookmarkedPlan(token, setError);
      if (!data) return;
      setPlans(data.items || []);
      console.log("Bookmarked data:", data);
      setIsLoading(false);
    })();
  }, []);

  const handleRemovePlan = async () => {
    const result = await deleteBookmarkedPlan(
      token,
      selectedPlanToRemove,
      setError,
    );

    if (!result) return;

    // Filter out the removed plan from the state
    setPlans(plans.filter((plan) => plan._id !== selectedPlanToRemove));
    setSelectedPlanToRemove(null);
    setAlertOpen(false);
  };

  const openDeleteDialog = (planId) => {
    setSelectedPlanToRemove(planId);
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  if (!isLoading && !plans.length)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5" color="textSecondary">
          Bookmarked Plans!
        </Typography>
      </Box>
    );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Bookmarked Plans</Typography>
      </Box>

      {isLoading && <p>Loading your plans ...</p>}
      {error && <p>{error}</p>}
      {plans.length > 0 && (
        <>
          <Grid container spacing={3}>
            {plans.map((plan) => {
              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={plan._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/plans/${plan._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <PlanCard
                      image={plan.images[0]}
                      title={plan.title}
                      rate={plan.rate}
                      type={plan.type}
                      distance={plan.distance}
                      stopCount={plan.stopCount}
                      planId={plan._id}
                    />
                  </Link>
                  <Box>
                    <Button
                      onClick={() => openDeleteDialog(plan._id)}
                      style={{ backgroundColor: "#f44336", color: "white" }}
                      sx={{ marginLeft: 1, marginTop: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <AlertDialog
            isOpen={alertOpen}
            onClose={handleClose}
            title="Removing Bookmarked Plan"
            message="Are you sure you want to remove this plan?"
            onConfirm={handleRemovePlan}
            confirmText="Remove"
            cancelText="Cancel"
          />
        </>
      )}
    </>
  );
}

export default Bookmarked;
