import React, { useState, useCallback, useEffect } from "react";
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
import Markers from "./Markers";

const INITIAL_CAMERA = {
  center: { lat: 39.8283, lng: -98.5795 },
  zoom: 5,
};

const MapViewPage = () => {
  const map = useMap();

  const userLocation = JSON.parse(localStorage.getItem("userLocation") || "0");
  const [cameraProps, setCameraProps] = useState<MapCameraProps>(
    userLocation || INITIAL_CAMERA,
  );
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | undefined>();

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    return setCameraProps(ev.detail);
  }, []);

  const debouncedHandleBoundsChange = useCallback(
    debounce(() => setBounds(map?.getBounds()), 300),
    [map],
  );

  useEffect(() => {
    debouncedHandleBoundsChange();
  }, []);

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
        {bounds && <Markers bounds={bounds} />}
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <LocateMeButton />
        </MapControl>
      </Map>
    </div>
  );
};

export default MapViewPage;
