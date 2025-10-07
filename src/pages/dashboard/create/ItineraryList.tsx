import React from "react";
import ItineraryItem from "./ItineraryItem";
import {useItinerary} from "@/context/ItineraryContext";

const ItineraryList = () => {
  const {places} = useItinerary();

  return (
    <>
      {places.map((place) => (
        <ItineraryItem key={place._id} place={place} />
      ))}
    </>
  );
};

export default ItineraryList;
