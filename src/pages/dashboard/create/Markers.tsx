import React, { memo, useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePlaces } from "@/context/PlacesContext";
import { Place } from "@/types";
import { InfoWindow, Marker } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { getMarkerIcon } from "@/types/map";

const Markers = memo(function Markers() {
  const map = useMap();
  const { isMobile } = useMediaQuery();
  const { places, selection, setSelection } = usePlaces();
  const selectedPlace: Place | null =
    places.find((p) => p.placeId === selection?.placeId) || null;

  useEffect(() => {
    if (!map || !selection || selection.source === "marker") return;

    const selectedPlace: Place | null =
      places.find((p) => p.placeId === selection?.placeId) || null;
    if (!selectedPlace) return;

    const position = selectedPlace.location;
    if (!isMobile) {
      map.panTo({
        lat: position[0],
        lng: position[1],
      });
      // Pan by half the width of the sidebar to the left to center the marker in the visible area.
      map.panBy(-160, 0);
    }
  }, [selection, map]);

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
      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.location}
          onClose={handlePopupClose}
        >
          <PlacePopup />
        </InfoWindow>
      )}
      {selection && selection.location && (
        <InfoWindow position={selection.location} onClose={handlePopupClose}>
          <PlacePopup />
        </InfoWindow>
      )}
    </>
  );
});

export default Markers;
