import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const queries = new URLSearchParams(useLocation().search);

  // TODO: Implement fetching logic here using the `q` value from URL queries
  console.log(queries.get("q"));

  return <div>SearchPage</div>;
};

export default SearchPage;
