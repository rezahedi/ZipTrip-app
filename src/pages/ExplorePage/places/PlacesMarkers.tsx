import React, { useCallback, useRef } from "react";
import { Marker } from "@/Components/Map";
import { getMarkerIcon } from "@/types/map";
import { usePlans } from "../PlansContext";
import ListEditor from "./list/ListEditor";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PlacesMarkers = function Markers() {
  const { places, selection, setSelection } = usePlans();
  const mouseOverTimeoutRef = useRef<number | null>(null);
  const { isMobile } = useMediaQuery();

  const handleClick = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (selection && placeId === selection.placeId) return;
      if (placeId) setSelection({ placeId, location, source: "marker" });
    },
    [selection, setSelection],
  );

  const handleMouseOver = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (placeId) {
        if (selection && placeId === selection.placeId) return;
        if (mouseOverTimeoutRef.current)
          clearTimeout(mouseOverTimeoutRef.current);
        mouseOverTimeoutRef.current = window.setTimeout(
          () => setSelection({ placeId, location, source: "marker" }),
          400,
        );
      }
    },
    [selection, setSelection],
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
            {...(isMobile
              ? { onClick: handleClick }
              : { onMouseOver: handleMouseOver, onMouseOut: handleMouseOut })}
          />
        ))}
      <ListEditor />
    </>
  );
};

export default PlacesMarkers;
