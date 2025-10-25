import React, { memo } from "react";
import { usePlaces } from "@/context/PlacesContext";
import { InfoWindow, Marker } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { getMarkerIcon } from "@/types/map";

const Markers = memo(function Markers() {
  const { places, selection, setSelection } = usePlaces();

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
          <PlacePopup />
        </InfoWindow>
      )}
    </>
  );
});

export default Markers;
