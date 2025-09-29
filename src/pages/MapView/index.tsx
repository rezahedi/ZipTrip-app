import React, { useCallback } from "react";
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
const MAP_INITIAL_VIEW = {
  defaultCenter: { lat: 37.7197499272203, lng: -122.31540987748134 },
  defaultZoom: 11,
};

const MapViewPage = () => {
  const userLocation = JSON.parse(localStorage.getItem("userLocation") || "0");
  const cameraProps: MapCameraProps = userLocation || MAP_INITIAL_VIEW;
  const map = useMap();
  const { setBoundingBox } = usePlans();

  const debouncedSetBoundingBox = useCallback(
    debounce(() => setBoundingBox(map?.getBounds()), 300),
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
        onBoundsChanged={debouncedSetBoundingBox}
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
