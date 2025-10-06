import React from "react";
import {PlansProvider} from "@/pages/MapView/PlansContext";
import Map from "./Map";
import {MapControl, ControlPosition} from "@vis.gl/react-google-maps";
import SidebarOverlay from "./SidebarOverlay";

const MapViewPage = () => {
  return (
    <div className="h-full">
      <PlansProvider>
        <Map>
          <MapControl position={ControlPosition.LEFT_TOP}>
            <SidebarOverlay />
          </MapControl>
        </Map>
      </PlansProvider>
    </div>
  );
};

export default MapViewPage;
