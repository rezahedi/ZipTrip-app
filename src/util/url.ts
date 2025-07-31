const getQueryValue = (queryString: string, queryName: string): string => {
  const queries = new URLSearchParams(queryString);
  return queries.get(queryName) || "";
};

export { getQueryValue };
