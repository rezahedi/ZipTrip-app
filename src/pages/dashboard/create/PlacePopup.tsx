import { usePlaces } from "@/context/PlacesContext";
import React, { useEffect, useState } from "react";
import { Place } from "@/types";
import { useItinerary } from "@/context/ItineraryContext";
import AddButton from "./AddButton";
import { fetchData } from "@/util";

const PlacePopup = () => {
  const { selection, setSelection } = usePlaces();
  const [placeLoading, setPlaceLoading] = useState<boolean>(false);
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
      setPlaceLoading(true);

      // fetch /api/v1/places/:placeId
      const URL = `places/${placeId}`;
      const res = await fetchData(URL, null, () => {});
      if (!res) return setPlaceLoading(false);

      setPlace(res);
      setPlaceLoading(false);
    })();
  }, [selection]);

  if (!place) return null;

  if (placeLoading) return <p>Loading...</p>;

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
        <AddButton onClick={handleAddToItinerary} isAdded={isAdded} />
      </div>
    </div>
  );
};

export default PlacePopup;
