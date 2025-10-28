import React from "react";
import { PlansProvider } from "@/pages/ExplorePage/PlansContext";
import { MapControl, ControlPosition } from "@vis.gl/react-google-maps";
import SidebarOverlay from "./SidebarOverlay";
import Title from "@/Components/Header/Title";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MapBox from "./MapBox";
import PlaceOverlay from "./places/PlaceOverlay";

const ExplorePage = () => {
  const { isMobile } = useMediaQuery();

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col">
      <Title>Explore Nearby Plans on the Map</Title>
      <PlansProvider>
        {isMobile ? (
          <>
            <MapBox className="h-5/12" />
            <SidebarOverlay className="flex-7/12 overflow-hidden" />
          </>
        ) : (
          <MapBox>
            <MapControl position={ControlPosition.LEFT_TOP}>
              <SidebarOverlay />
            </MapControl>
            <MapControl position={ControlPosition.RIGHT_BOTTOM}>
              <PlaceOverlay />
            </MapControl>
          </MapBox>
        )}
      </PlansProvider>
    </div>
  );
};

export default ExplorePage;
