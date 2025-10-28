import React from "react";
import { usePlans } from "../PlansContext";
import { StarIcon, XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { Place } from "@/types";
import { formatNumber } from "@/lib/utils";

const PlaceOverlay = () => {
  const { placeDetail, setPlaceDetail } = usePlans();
  const place: Place = placeDetail?.place as Place;

  const handleClose = () => {
    if (!placeDetail) return;

    setPlaceDetail(null);
  };

  if (!place) return null;

  return (
    <div className="bg-background p-4 md:m-4">
      <IconButton onClick={handleClose} className="absolute top-4 right-4">
        <XIcon />
      </IconButton>
      <h3 className="mr-4">{place.name}</h3>
      <address>{place.address}</address>
      <p className="flex gap-1 items-center">
        <StarIcon className="size-3" />{" "}
        <b className="font-semibold">{place.rating}</b> (
        {formatNumber(place.userRatingCount)})
      </p>
      <p>{place.summary}</p>
    </div>
  );
};

export default PlaceOverlay;
