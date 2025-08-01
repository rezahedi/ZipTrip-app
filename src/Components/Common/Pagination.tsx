import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({
  page = 1,
  pagesCount,
}: {
  page: number;
  pagesCount: number;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const switchPage = (pageIncrement: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", (page + pageIncrement).toString());
    const paramsString = params.toString();

    navigate(`${location.pathname}?${paramsString}`);
  };

  const isFirstPage = page === 1;
  const isLastPage = page === pagesCount;

  const handleNext = () => {
    if (isLastPage) return;
    switchPage(1);
  };

  const handlePrev = () => {
    if (isFirstPage) return;
    switchPage(-1);
  };

  if (pagesCount <= 1) return;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        mt: 4,
      }}
    >
      <Button
        disabled={isFirstPage}
        onClick={handlePrev}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            border: "1px solid grey",
          },
        }}
      >
        Previous
      </Button>
      <Typography sx={{ flexGrow: 1, textAlign: "center" }} variant="body1">
        Page {page}
      </Typography>
      <Button
        disabled={isLastPage}
        onClick={handleNext}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            border: "1px solid grey",
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
