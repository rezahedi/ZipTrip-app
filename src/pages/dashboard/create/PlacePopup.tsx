import {usePlaces} from "@/context/PlacesContext";
import React from "react";
import {Place} from "@/types";
import {Button} from "@/Components/ui/button";
import {useItinerary} from "@/context/ItineraryContext";

const PlacePopup = () => {
  const {selection} = usePlaces();
  const place = selection?.item as Place | undefined;
  const {addNewPlace} = useItinerary();

  const handleAddToItinerary = () => {
    if (!place) return;

    addNewPlace(place);
  };

  if (!place) return null;

  return (
    <div className="flex gap-1 w-xs h-32">
      <img
        className="w-24 h-full object-cover rounded-sm"
        src={place.imageURL}
        alt={place.name}
      />
      <div className="flex-4/5 max-h-40 px-2">
        <h3 className="font-medium text-base/snug text-balance py-1">
          {place.name}
        </h3>
        <Button size="sm" className="mt-2" onClick={handleAddToItinerary}>
          Add to Itinerary
        </Button>
      </div>
    </div>
  );
};

export default PlacePopup;
