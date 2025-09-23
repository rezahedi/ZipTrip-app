import React, { useState, useCallback } from "react";
import {
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import LocateMeButton from "./LocateMeButton";

const INITIAL_CAMERA = {
  center: { lat: 39.8283, lng: -98.5795 },
  zoom: 5,
};

const MapViewPage = () => {
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
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
      >
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <LocateMeButton />
        </MapControl>
      </Map>
    </div>
  );
};

export default MapViewPage;
