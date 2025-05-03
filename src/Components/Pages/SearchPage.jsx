import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryValue } from "../../util/url";

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(getQueryValue(location.search, "q"));

  useEffect(() => {
    setSearchQuery(getQueryValue(location.search, "q"));
  }, [location.search]);

  return <div>SearchPage</div>;
};

export default SearchPage;
