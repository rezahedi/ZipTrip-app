import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQueryValue } from "../../util/url";
import { Box, Typography, Grid } from "@mui/material";
import PlanCard from "../Common/PlanCard";
import { fetchPlans } from "../../util";
import Pagination from "../Common/Pagination";
import PlanCardSkeleton from "../Common/PlanCardSkeleton";
import { useAuth } from "../../context/AuthContext";

const PAGE_SIZE = 8;

const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [category, setCategory] = useState({});
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
  }, [location.search]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      params.set("size", PAGE_SIZE);
      const paramsString = params.toString();

      try {
        const res = await fetchPlans(
          `plans/category/${categoryId}?${paramsString}`,
          token,
          setError,
        );
        const { plans: categoryPlans, ...categoryDetails } = res;
        console.log(categoryPlans, categoryDetails);
        setPlans(categoryPlans.items || []);
        setCategory(categoryDetails || {});
        setPagesCount(categoryPlans.pagesCount || 0);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, [page]);

  if (!isLoading && plans.length === 0) return <>There is no plans.</>;

  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        {category.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {category.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {!isLoading && error && <p>{error}</p>}
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <PlanCardSkeleton />
              </Grid>
            ))}
          {!isLoading &&
            plans.map((plan) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
                <PlanCard {...plan} planId={plan._id} image={plan.images[0]} />
              </Grid>
            ))}
        </Grid>
        <Pagination page={Number(page)} pagesCount={pagesCount} />
      </Box>
    </Box>
  );
};

export default CategoryPage;
