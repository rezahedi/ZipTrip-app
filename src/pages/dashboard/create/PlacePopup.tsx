import {usePlaces} from "@/context/PlacesContext";
import React from "react";

const PlacePopup = () => {
  const {selection} = usePlaces();
  const place = selection?.item;

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
      </div>
    </div>
  );
};

export default PlacePopup;
