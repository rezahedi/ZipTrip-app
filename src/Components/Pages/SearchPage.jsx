import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryValue } from "../../util/url";
import { Box, Typography, Grid } from "@mui/material";
import PlanCard from "../Common/PlanCard";
import { getData } from "../../util";
import WelcomeMessage from "../Common/search/WelcomeMessage";
import EmptyResultMessage from "../Common/search/EmptyResultMessage";
import Pagination from "../Common/Pagination";

const PAGE_SIZE = 8;

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`;

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    getQueryValue(location.search, "q"),
  );
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
    setSearchQuery(getQueryValue(location.search, "q"));
  }, [location.search]);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      params.set("search", searchQuery);
      params.set("page", page);
      params.set("size", PAGE_SIZE);
      const paramsString = params.toString();

      try {
        const res = await getData(`${API_URL}?${paramsString}`);
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
        {isLoading && <>Loading ...</>}
        {plans.length > 0 && (
          <>
            <Grid container spacing={3} sx={{ width: "100%" }}>
              {plans.map((plan) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
                  <PlanCard
                    {...plan}
                    planId={plan._id}
                    image={plan.images[0]}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination page={Number(page)} pagesCount={pagesCount} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
