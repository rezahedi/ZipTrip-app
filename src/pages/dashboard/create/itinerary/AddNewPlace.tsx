import { useItinerary } from "@/context/ItineraryContext";
import React from "react";
import AddPlaceFromList from "./AddPlaceFromList";

const AddNewPlace = () => {
  const { addPlace } = useItinerary();

  return (
    <div className="bg-background p-3 sticky bottom-0 flex items-center gap-1">
      <input
        type="text"
        placeholder="Add a place..."
        className="border rounded-lg p-1.5 w-full"
      />
      <AddPlaceFromList onAddPlace={addPlace}>From List</AddPlaceFromList>
    </div>
  );
};

export default AddNewPlace;
