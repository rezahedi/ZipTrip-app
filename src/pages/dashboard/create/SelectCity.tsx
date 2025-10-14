import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityAutocomplete from "./CityAutocomplete";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";

// Create a client
const queryClient = new QueryClient();

const SelectCity = ({ name }: { name: string }) => {
  const [selectedCities, setSelectedCities] = useState<
    { placeId: string; name: string }[]
  >([]);

  const handleSelectCity = (city: { value: string; label: string }) => {
    setSelectedCities([
      ...selectedCities,
      { placeId: city.value, name: city.label },
    ]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CityAutocomplete onSelect={handleSelectCity} />
      {selectedCities.length > 0 &&
        selectedCities.map((city) => (
          <p key={city.placeId}>
            {city.name}
            <IconButton
              onClick={() =>
                setSelectedCities(
                  selectedCities.filter((c) => c.placeId !== city.placeId),
                )
              }
            >
              <XIcon />
            </IconButton>
          </p>
        ))}
      <input type="hidden" name={name} value={JSON.stringify(selectedCities)} />
    </QueryClientProvider>
  );
};

export default SelectCity;
