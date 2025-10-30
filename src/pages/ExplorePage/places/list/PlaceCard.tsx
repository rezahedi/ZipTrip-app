import { formatNumber } from "@/lib/utils";
import { Place } from "@/types";
import { PlusIcon, StarIcon } from "lucide-react";
import React from "react";

const PlaceCard = ({
  place,
  onPlaceSelect,
}: {
  place: Place;
  onPlaceSelect: (place: Place) => void;
}) => {
  return (
    <div
      className="flex gap-1 aspect-[16/10] sm:aspect-[6/5] relative cursor-pointer"
      role="button"
      onClick={() => onPlaceSelect(place)}
      title="Add to Itinerary"
    >
      <img
        className="absolute top-0 left-0 size-full object-cover rounded-sm"
        src={place.imageURL}
        alt={place.name}
      />
      <div className="absolute size-full bg-gradient-to-t from-background/80 via-20% via-background/80 hover:background/95 hover:to-background/50">
        <div className="absolute bottom-2 left-2 space-y-1">
          <h3 className="font-medium text-base text-balance">{place.name}</h3>
          {/* <p className="text-sm">{place.address}</p> */}
          <p className="flex gap-1 items-center">
            <StarIcon className="size-3" />{" "}
            <b className="font-semibold">{place.rating}</b> (
            {formatNumber(place.userRatingCount)})
          </p>
        </div>
        <PlusIcon className="absolute top-2 right-2" />
      </div>
    </div>
  );
};

export default PlaceCard;
