import React, { useState, useCallback, useEffect } from "react";
import {
  Map,
  useMap,
  MapCameraProps,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import LocateMeButton from "./LocateMeButton";
import { debounce } from "@/lib/utils";
import Markers from "./Markers";
import SidebarOverlay from "./SidebarOverlay";
import { usePlans } from "./PlansContext";

// Bay Area
const INITIAL_CAMERA = {
  defaultCenter: { lat: 37.7197499272203, lng: -122.31540987748134 },
  defaultZoom: 11,
};

const MapViewPage = () => {
  const userLocation = JSON.parse(localStorage.getItem("userLocation") || "0");
  const cameraProps: MapCameraProps = userLocation || INITIAL_CAMERA;
  const map = useMap();
  const { plans, setBounds } = usePlans();

  const debouncedHandleBoundsChange = useCallback(
    debounce(() => setBounds(map?.getBounds()), 300),
    [map],
  );

  return (
    <div className="h-full">
      <Map
        {...cameraProps}
        style={{ width: "100%", height: "100%" }}
        disableDefaultUI={false}
        gestureHandling="greedy"
        streetViewControl={false}
        onBoundsChanged={debouncedHandleBoundsChange}
      >
        <Markers />
        <MapControl position={ControlPosition.LEFT_TOP}>
          <SidebarOverlay />
        </MapControl>
        <MapControl position={ControlPosition.RIGHT_BOTTOM}>
          <LocateMeButton />
        </MapControl>
      </Map>
    </div>
  );
};

export default MapViewPage;
