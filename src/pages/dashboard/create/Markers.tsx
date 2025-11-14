import React, { memo, useCallback } from "react";
import { usePlaces } from "@/context/PlacesContext";
import { InfoWindow, Marker } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { getMarkerIcon } from "@/types/map";
import ListEditor from "@/pages/ExplorePage/places/list/ListEditor";

const Markers = memo(function Markers() {
  const { places, selection, setSelection } = usePlaces();

  const handleClick = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (selection && placeId === selection.placeId) return;
      if (placeId) setSelection({ placeId, location, source: "marker" });
    },
    [selection, setSelection],
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
      <ListEditor />
    </>
  );
});

export default Markers;
