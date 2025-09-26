import React, { useState, useCallback, useMemo } from "react";
import {
  Map,
  useMap,
  MapCameraChangedEvent,
  MapCameraProps,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import LocateMeButton from "./LocateMeButton";
import { debounce } from "@/lib/utils";

const INITIAL_CAMERA = {
  center: { lat: 39.8283, lng: -98.5795 },
  zoom: 5,
};

const MapViewPage = () => {
  const map = useMap();
  // TODO: Get user's location from local storage
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    return setCameraProps(ev.detail);
  }, []);

  const handleBoundsChange = () => {
    const bounds = map?.getBounds();
    // TODO: fetch data and show as pointers on map
    // TODO: Debounce api calls
    console.log(
      `/plans/nearby/?latmin=${bounds?.getSouthWest().lat()}&lngmin=${bounds?.getNorthEast().lng()}&latmax=${bounds?.getNorthEast().lat()}&lngmax=${bounds?.getSouthWest().lng()}`,
    );
  };

  const debouncedHandleBoundsChange = useMemo(
    () => debounce(handleBoundsChange, 300),
    [],
  );

  return (
    <div className="h-full">
      <Map
        {...cameraProps}
        onCameraChanged={handleCameraChange}
        style={{ width: "100%", height: "100%" }}
        disableDefaultUI={false}
        gestureHandling="greedy"
        streetViewControl={false}
        onBoundsChanged={debouncedHandleBoundsChange}
      >
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <LocateMeButton />
        </MapControl>
      </Map>
    </div>
  );
};

export default MapViewPage;
