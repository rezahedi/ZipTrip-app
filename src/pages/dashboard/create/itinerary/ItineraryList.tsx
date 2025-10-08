import React from "react";
import ItineraryItem from "./ItineraryItem";
import {useItinerary} from "@/context/ItineraryContext";
import EmptySlate from "./EmptySlate";
import AddNewPlace from "./AddNewPlace";

const ItineraryList = () => {
  const {places} = useItinerary();

  return (
    <div className="space-y-4">
      {places &&
        places.map((place) => <ItineraryItem key={place._id} place={place} />)}
      {places.length === 0 && <EmptySlate />}
      <AddNewPlace />
    </div>
  );
};

export default ItineraryList;
