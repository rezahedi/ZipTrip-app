import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryValue } from "../../util/url";
import { Box, Typography, Grid } from "@mui/material";
import PlanCard from "../Common/PlanCard";
import { getData } from "../../util";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`;

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    getQueryValue(location.search, "q"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setSearchQuery(getQueryValue(location.search, "q"));
  }, [location.search]);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      params.set("search", searchQuery);
      const paramsString = params.toString();

      try {
        const res = await getData(`${API_URL}?${paramsString}`);
        setPlans(res?.items || []);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, [searchQuery]);

  if (searchQuery === "")
    return <>Use searchbar to search for anything you like!</>;

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
        Search result for <u>{searchQuery}</u>:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {isLoading && <>Loading ...</>}
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {!isLoading && plans.length === 0 && (
            <>Found nothing! Try something else!</>
          )}
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

export default SearchPage;
