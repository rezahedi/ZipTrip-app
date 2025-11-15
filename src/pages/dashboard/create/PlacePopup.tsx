import { usePlaces } from "@/context/PlacesContext";
import React, { useEffect, useState } from "react";
import { Place } from "@/types";
import { useItinerary } from "@/context/ItineraryContext";
import AddButton from "./AddButton";
import { fetchData } from "@/util";
import PlacePopupSkeleton from "./PlacePopupSkeleton";
import { StarIcon } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import AddToListButton from "@/pages/ExplorePage/places/list/AddToListButton";

const PlacePopup = () => {
  const { selection } = usePlaces();
  const [detailLoading, setDetailLoading] = useState<boolean>(true);
  const [place, setPlace] = useState<Place | null>(null);
  // const place = selection?.item as Place | undefined;
  const { plan, addPlace } = useItinerary();
  const [error, setError] = useState<string>("");
  const places = plan?.stops || [];
  const isAdded = place
    ? !!places.find((p) => p.placeId === place.placeId)
    : false;

  const handleAddToItinerary = () => {
    if (!place) return;

    addPlace(place);
  };

  useEffect(() => {
    if (!selection) return;

    (async () => {
      setError("");
      setDetailLoading(true);

      // Fetch place's detail from API
      const URL = `places/${selection.placeId}`;
      const res = await fetchData(URL, null, () => {});
      if (!res) {
        setError("Couldn't find it, Try again or try other places!");
        return setDetailLoading(false);
      }

      setPlace(res);
      setDetailLoading(false);
    })();
  }, [selection]);

  if (!selection) return null;

  if (detailLoading) return <PlacePopupSkeleton />;

  if (error) return <div className="flex pt-6 p-3 text-center">{error}</div>;

  if (!place) return null;

  return (
    <div className="flex gap-1 sm:w-xs">
      <img
        className="w-24 object-cover rounded-sm hidden sm:block"
        src={place.imageURL}
        alt={place.name}
      />
      <div className="flex-4/5 max-h-40 px-2">
        <h3 className="font-medium text-base/snug text-balance py-1">
          {place.name}
        </h3>
        <p>{place.address}</p>
        <p className="flex gap-1 items-center">
          <StarIcon className="size-3" />{" "}
          <b className="font-semibold">{place.rating}</b> (
          {formatNumber(place.userRatingCount)})
        </p>
        <div className="flex items-center mt-2">
          <AddButton onClick={handleAddToItinerary} isAdded={isAdded} />
          <AddToListButton place={place} />
        </div>
      </div>
    </div>
  );
};

export default PlacePopup;
