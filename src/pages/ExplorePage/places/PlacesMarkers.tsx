import React from "react";
import { InfoWindow, Marker } from "@/Components/Map";
import { getMarkerIcon } from "@/types/map";
import Popup from "./Popup";
import { usePlans } from "../PlansContext";

const PlacesMarkers = function Markers() {
  const { places, selection, setSelection } = usePlans();

  const handlePopupClose = () => {
    setSelection(null);
  };

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
      {selection && selection.location && (
        <InfoWindow position={selection.location} onClose={handlePopupClose}>
          <Popup />
        </InfoWindow>
      )}
    </>
  );
};

export default PlacesMarkers;
