import IconButton from "@/Components/ui/IconButton";
import { formatNumber } from "@/lib/utils";
import { Place } from "@/types";
import { XIcon, StarIcon } from "lucide-react";
import React from "react";

const PlaceCard = ({
  place,
  onPlaceSelect,
  onPlaceRemove,
}: {
  place: Place;
  onPlaceSelect: (place: Place) => void;
  onPlaceRemove: () => void;
}) => {
  const handlePlaceRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPlaceRemove();
  };

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
          <h3 className="font-medium text-base/tight text-balance">
            {place.name}
          </h3>
          {/* <p className="text-sm">{place.address}</p> */}
          <p className="flex gap-1 items-center text-xs">
            <StarIcon className="size-3 fill-foreground" />{" "}
            <b className="font-semibold">{place.rating}</b> (
            {formatNumber(place.userRatingCount)})
          </p>
        </div>
        <IconButton
          title="Remove from list"
          className="absolute top-1 right-1 text-foreground hover:bg-background hover:text-foreground"
          onClick={handlePlaceRemove}
        >
          <XIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PlaceCard;
