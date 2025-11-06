import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityAutocomplete from "./CityAutocomplete";
import Cities from "./Cities";
import { postData } from "@/util";
import { City } from "@/types";

// Create a client
const queryClient = new QueryClient();

const SelectCity = ({ name }: { name: string }) => {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const handleSelectCity = (city: { value: string; label: string }) => {
    if (selectedCities.find((c) => c.placeId === city.value)) return;

    const newCity = { placeId: city.value, name: city.label };

    setSelectedCities((prev) => [...prev, newCity]);
    postData(`plans/city`, newCity, () => {});
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CityAutocomplete onSelect={handleSelectCity} />
      <div className="flex gap-2 flex-wrap">
        <Cities
          cities={selectedCities}
          onRemove={(city) =>
            setSelectedCities(
              selectedCities.filter((c) => c.placeId !== city.placeId),
            )
          }
        />
      </div>
      <input type="hidden" name={name} value={JSON.stringify(selectedCities)} />
    </QueryClientProvider>
  );
};

export default SelectCity;
