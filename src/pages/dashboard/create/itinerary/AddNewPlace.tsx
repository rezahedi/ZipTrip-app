import { Button } from "@/Components/ui/button";
import { useItinerary } from "@/context/ItineraryContext";
import ListPlacesModal from "@/pages/ExplorePage/places/list/ListPlacesModal";
import { Place } from "@/types";
import React, { useState } from "react";

const AddNewPlace = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addPlace } = useItinerary();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePlaceSelect = (place: Place) => {
    addPlace(place);
    handleClose();
  };

  return (
    <div className="bg-background p-3 sticky bottom-0 flex items-center gap-1">
      <input
        type="text"
        placeholder="Add a place..."
        className="border rounded-lg p-1.5 w-full"
      />
      <Button onClick={handleOpen}>From List</Button>
      <ListPlacesModal
        isOpen={isOpen}
        onClose={handleClose}
        onPlaceSelect={handlePlaceSelect}
      />
    </div>
  );
};

export default AddNewPlace;
