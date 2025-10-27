import React from "react";
import { Marker } from "@/Components/Map";
import { getMarkerIcon } from "@/types/map";
import { usePlans } from "../PlansContext";

const PlacesMarkers = function Markers() {
  const { places, setSelection } = usePlans();

  return (
    <>
      {places.length > 0 &&
        places.map((item) => (
          <Marker
            key={item.placeId}
            placeId={item.placeId}
            emoji={getMarkerIcon(item.type)}
            title={item.name}
            position={item.location}
            iconURL="/places/emoji_marker.svg"
            onClick={setSelection}
          />
        ))}
    </>
  );
};

export default PlacesMarkers;
