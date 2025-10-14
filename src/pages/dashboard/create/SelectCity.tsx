import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityAutocomplete from "./CityAutocomplete";

// Create a client
const queryClient = new QueryClient();

const SelectCity = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CityAutocomplete />
    </QueryClientProvider>
  );
};

export default SelectCity;
