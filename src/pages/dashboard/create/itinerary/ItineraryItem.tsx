import React from "react";
import {useItinerary} from "@/context/ItineraryContext";
import {XIcon} from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import {PlaceType} from "@/context/PlanTypes";

const ItineraryItem = ({place}: {place: PlaceType}) => {
  const {removePlace} = useItinerary();

  const handleClick = () => {
    if (!place || !place.placeId) return;

    removePlace(place.placeId);
  };

  return (
    <div className="flex gap-1 my-4 bg-foreground/5 rounded-sm items-stretch relative group">
      <IconButton
        onClick={handleClick}
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        size="sm"
        variant="ghost"
      >
        <XIcon />
      </IconButton>
      <div className="w-22 shrink-0">
        <img
          className="w-full h-full object-cover rounded-l-sm"
          src={place.imageURL}
          alt={place.name}
        />
      </div>
      <div className="p-2">
        <h3 className="font-medium text-base/snug text-balance py-1">
          {place.name}
        </h3>
        <p className="text-foreground/70 font-normal text-xs">
          {place.address}
        </p>
      </div>
    </div>
  );
};

export default ItineraryItem;
