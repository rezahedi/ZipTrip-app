import React from "react";
import ItineraryItem from "./ItineraryItem";
import { useItinerary } from "@/context/ItineraryContext";
import EmptySlate from "./EmptySlate";

const ItineraryList = () => {
  const { plan } = useItinerary();
  const places = plan?.stops || [];

  return (
    <div className="space-y-4">
      {places &&
        places.map((place) => (
          <ItineraryItem key={place.placeId} place={place} />
        ))}
      {places.length === 0 && <EmptySlate />}
    </div>
  );
};

export default ItineraryList;
