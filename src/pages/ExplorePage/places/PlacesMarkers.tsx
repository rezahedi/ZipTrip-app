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
            iconOption={{
              url: "/places/emoji_round.svg",
              // eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(38, 38),
              // eslint-disable-next-line no-undef
              anchor: new google.maps.Point(19, 38),
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ))}
    </>
  );
};

export default PlacesMarkers;
