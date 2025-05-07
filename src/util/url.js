const getQueryValue = (queryString, queryName) => {
  const queries = new URLSearchParams(queryString);
  return queries.get(queryName) || "";
};

export { getQueryValue };
