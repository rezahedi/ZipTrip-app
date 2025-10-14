import React, { useState } from "react";
import { AutoComplete } from "@/ui/Autocomplete";
import { useQuery } from "@tanstack/react-query";

const googlePlaceAutoComplete_URL = `https://places.googleapis.com/v1/places:autocomplete?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`;

type CityType = {
  value: string; // placeId
  label: string; // City Name
};

const CityAutocomplete = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  const getList = async (searchQuery: string) => {
    console.log("searchQuery", searchQuery);
    if (!searchQuery) return [];

    const res = await fetch(googlePlaceAutoComplete_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: searchQuery,
        includedPrimaryTypes: ["locality"],
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData.msg || "Failed to create plan");
      return;
    }
    const { suggestions } = await res.json();
    let citiesList: CityType[] = [];
    suggestions.forEach((suggestion: any) => {
      const { placePrediction } = suggestion;
      citiesList.push({
        value: placePrediction.placeId,
        label: placePrediction.text.text,
      });
    });
    return citiesList;
  };

  // TODO: Somehow debounce the setSearchValue to prevent api fetch call on each keystrokes

  /*
{
  "placePrediction": {
    "place": "places/ChIJA-2qKIt9hYARZ5N1NdUVtHE",
    "placeId": "ChIJA-2qKIt9hYARZ5N1NdUVtHE",
    "text": {
      "text": "Oakland, CA, USA",
      "matches": [
        {
          "endOffset": 7
        }
      ]
    },
    "structuredFormat": {
      "mainText": {
        "text": "Oakland",
        "matches": [
          {
            "endOffset": 7
          }
        ]
      },
      "secondaryText": {
        "text": "CA, USA"
      }
    },
    "types": [
      "geocode",
      "political",
      "locality"
    ]
  }
},
 */
  return (
    <div className="flex flex-col">
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data ?? []}
        isLoading={isLoading}
        emptyMessage="No city found."
        placeholder="Search and select a city to start your plan"
      />
    </div>
  );
};

export default CityAutocomplete;
