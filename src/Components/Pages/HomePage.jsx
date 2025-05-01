import React, { useEffect, useState } from "react";
import PlanCard from "../Common/PlanCard";
import { Box, Grid } from "@mui/material";
import { getData } from "../../util";
import { getBookmarks } from "../../util/dashboard";
import { useAuth } from "../../context/AuthContext";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`;

const HomePage = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);

  const setError = (errorMessage) => {
    console.log("error", errorMessage);
  };

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await getData(URL);

        if (!result || result.items.length === 0) return;

        let fetchedPlans = result.items;

        if (token) {
          const fetchedBookmarks = await getBookmarks(token, setError);
          if (fetchedBookmarks && fetchedBookmarks.items.length > 0) {
            const bookmarksIds = fetchedBookmarks.items.map((item) => item._id);

            setPlans(
              fetchedPlans.map((plan) => {
                return {
                  ...plan,
                  isBookmarked: bookmarksIds.includes(plan._id),
                };
              }),
            );
          }
        } else {
          setPlans(
            fetchedPlans.map((plan) => {
              return {
                ...plan,
                isBookmarked: false,
              };
            }),
          );
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllPlans();
  }, [token]);

  return (
    <>
      <Box>
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
                  isBookmarked={plan.isBookmarked}
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
