import React, { useCallback, useRef } from "react";
import { Marker } from "@/Components/Map";
import { getMarkerIcon } from "@/types/map";
import { usePlans } from "../PlansContext";

const PlacesMarkers = function Markers() {
  const { places, selection, setSelection } = usePlans();
  const mouseOverTimeoutRef = useRef<number | null>(null);

  const handleMouseOver = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (placeId) {
        if (mouseOverTimeoutRef.current)
          clearTimeout(mouseOverTimeoutRef.current);
        mouseOverTimeoutRef.current = window.setTimeout(
          () => setSelection({ placeId, location, source: "marker" }),
          400,
        );
      }
    },
    [setSelection],
  );

  const handleMouseOut = useCallback(
    (placeId?: string) => {
      if (!mouseOverTimeoutRef.current) return;
      if (selection === null || (selection && selection.placeId !== placeId))
        clearTimeout(mouseOverTimeoutRef.current);
    },
    [selection],
  );

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
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ))}
    </>
  );
};

export default PlacesMarkers;
