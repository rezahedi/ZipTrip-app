import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import { Box, Typography, Grid } from "@mui/material";
import PlanCard from "@/Components/Common/PlanCard";
import { fetchPlans } from "@/util";
import WelcomeMessage from "@/Components/Common/search/WelcomeMessage";
import EmptyResultMessage from "@/Components/Common/search/EmptyResultMessage";
import Pagination from "@/Components/Common/Pagination";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { useAuth } from "@/context/AuthContext";
import { Plan } from "@/types";

const PAGE_SIZE = 8;

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    getQueryValue(location.search, "q"),
  );
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
    setSearchQuery(getQueryValue(location.search, "q"));
  }, [location.search]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("search", searchQuery);
      params.set("page", page);
      params.set("size", PAGE_SIZE.toString());
      const paramsString = params.toString();

      try {
        const res = await fetchPlans(`plans?${paramsString}`, token, setError);
        setPlans(res?.items || []);
        setPagesCount(res?.pagesCount || 0);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, [searchQuery, page]);

  if (searchQuery === "") return <WelcomeMessage />;

  if (!isLoading && plans.length === 0) return <EmptyResultMessage />;

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

export default SearchPage;
