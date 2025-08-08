import React from "react";
import { Button } from "../ui/button";
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
    <div className="flex justify-between w-full mt-1">
      <Button
        variant={isFirstPage ? "outline" : "default"}
        disabled={isFirstPage}
        onClick={handlePrev}
      >
        Previous
      </Button>
      <p className="grow text-center">Page {page}</p>
      <Button
        variant={isLastPage ? "outline" : "default"}
        disabled={isLastPage}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
