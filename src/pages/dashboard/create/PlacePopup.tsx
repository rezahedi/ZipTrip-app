import { usePlaces } from "@/context/PlacesContext";
import React, { useEffect, useState } from "react";
import { Place } from "@/types";
import { useItinerary } from "@/context/ItineraryContext";
import AddButton from "./AddButton";
import { fetchData } from "@/util";
import PlacePopupSkeleton from "./PlacePopupSkeleton";

const PlacePopup = () => {
  const { selection } = usePlaces();
  const [detailLoading, setDetailLoading] = useState<boolean>(true);
  const [place, setPlace] = useState<Place | null>(null);
  // const place = selection?.item as Place | undefined;
  const { plan, addPlace } = useItinerary();
  const places = plan?.stops || [];
  const isAdded = place
    ? !!places.find((p) => p.placeId === place.placeId)
    : false;

  const handleAddToItinerary = () => {
    if (!place) return;

    addPlace(place);
  };

  useEffect(() => {
    if (!selection || !selection.item) return;
    const placeId = (selection?.item as Place)?.placeId;

    (async () => {
      setDetailLoading(true);

      // If name had value, mean the place is already exist in db
      // if not fetch place's detail from G-Places API
      const URL =
        "name" in selection.item && selection.item.name === ""
          ? `places/fetch/${placeId}`
          : `places/${placeId}`;
      const res = await fetchData(URL, null, () => {});
      if (!res) return setDetailLoading(false);

      setPlace(res);
      setDetailLoading(false);
    })();
  }, [selection]);

  if (!selection) return null;

  if (detailLoading) return <PlacePopupSkeleton />;

  return (
    <div className="flex gap-1 sm:w-xs sm:h-32">
      <img
        className="w-24 h-full object-cover rounded-sm hidden sm:block"
        src={place?.imageURL}
        alt={place?.name}
      />
      <div className="flex-4/5 max-h-40 px-2">
        <h3 className="font-medium text-base/snug text-balance py-1">
          {place?.name}
        </h3>
        <p>{place?.address}</p>
        <AddButton onClick={handleAddToItinerary} isAdded={isAdded} />
      </div>
    </div>
  );
};

export default PlacePopup;
