import React, { memo, useCallback } from "react";
import { usePlaces } from "@/context/PlacesContext";
import { InfoWindow, Marker } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { getMarkerIcon } from "@/types/map";

const Markers = memo(function Markers() {
  const { places, selection, setSelection } = usePlaces();

  const handleClick = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (placeId) setSelection({ placeId, location, source: "marker" });
    },
    [setSelection],
  );

  const handlePopupClose = useCallback(() => {
    setSelection(null);
  }, [setSelection]);

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
            onClick={handleClick}
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
