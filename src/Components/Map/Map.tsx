import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import {
  Map as GMap,
  useMap,
  MapCameraProps,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { debounce } from "@/lib/utils";

// Bay Area
const MAP_INITIAL_VIEW = {
  defaultCenter: { lat: 37.70580795161106, lng: -122.51368137617244 },
  defaultZoom: 11,
};

const Map = ({
  children,
  setBoundingBox,
  onClick,
  defaultBounds = null,
}: {
  children?: ReactNode;
  setBoundingBox: Dispatch<
    // eslint-disable-next-line no-undef
    SetStateAction<google.maps.LatLngBounds | undefined>
  >;
  onClick?: (e: MapMouseEvent) => void;
  // eslint-disable-next-line no-undef
  defaultBounds?: google.maps.LatLngBoundsLiteral | null;
}) => {
  const userLocation = JSON.parse(localStorage.getItem("userLocation") || "0");
  const cameraProps: MapCameraProps = userLocation || MAP_INITIAL_VIEW;
  const map = useMap();

  const debouncedSetBoundingBox = useCallback(
    debounce(() => setBoundingBox(map?.getBounds()), 300),
    [map],
  );

  useEffect(() => {
    if (map) debouncedSetBoundingBox();
  }, [map]);

  return (
    <GMap
      {...cameraProps}
      {...(defaultBounds && { defaultBounds })}
      style={{ width: "100%", height: "100%" }}
      disableDefaultUI={false}
      gestureHandling="greedy"
      streetViewControl={false}
      mapTypeControl={false}
      onDragend={debouncedSetBoundingBox}
      onZoomChanged={debouncedSetBoundingBox}
      onClick={onClick}
    >
      {children}
    </GMap>
  );
};

export default Map;
