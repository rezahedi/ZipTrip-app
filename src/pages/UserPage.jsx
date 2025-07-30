import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import PlanCard from "@/Components/Common/PlanCard";
import { fetchPlans } from "@/util";
import Pagination from "@/Components/Common/Pagination";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { useAuth } from "@/context/AuthContext";

const PAGE_SIZE = 8;

const UserPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [user, setUser] = useState({});
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
          `plans/user/${userId}?${paramsString}`,
          token,
          setError,
        );
        const { plans: userPlans, ...userDetails } = res;
        console.log(userPlans, userDetails);
        setPlans(userPlans.items || []);
        setUser(userDetails || {});
        setPagesCount(userPlans.pagesCount || 0);
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
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {user.name && (
          <>
            <Avatar
              alt={user.name}
              src={user.imageURL}
              sx={{ bgcolor: "#4CAF50" }}
            />
            {user.name}
          </>
        )}
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

export default UserPage;
