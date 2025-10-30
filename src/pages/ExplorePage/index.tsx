import React from "react";
import { PlansProvider } from "@/pages/ExplorePage/PlansContext";
import { MapControl, ControlPosition } from "@vis.gl/react-google-maps";
import SidebarOverlay from "./SidebarOverlay";
import Title from "@/Components/Header/Title";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MapBox from "./MapBox";
import PlaceOverlay from "./places/PlaceOverlay";
import { ListProvider } from "@/context/ListContext";

const ExplorePage = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col">
      <Title>Explore Nearby Plans on the Map</Title>
      <PlansProvider>
        <ListProvider>
          {isMobile && (
            <>
              <MapBox className="h-5/12" />
              <PlaceOverlay />
              <SidebarOverlay className="flex-7/12 overflow-hidden" />
            </>
          )}
          {isTablet && (
            <MapBox>
              <MapControl position={ControlPosition.TOP_LEFT}>
                <SidebarOverlay />
              </MapControl>
              <MapControl position={ControlPosition.RIGHT_BOTTOM}>
                <PlaceOverlay />
              </MapControl>
            </MapBox>
          )}
          {isDesktop && (
            <MapBox>
              <MapControl position={ControlPosition.TOP_LEFT}>
                <SidebarOverlay />
              </MapControl>
              <MapControl position={ControlPosition.TOP_LEFT}>
                <PlaceOverlay />
              </MapControl>
            </MapBox>
          )}
        </ListProvider>
      </PlansProvider>
    </div>
  );
};

export default ExplorePage;
