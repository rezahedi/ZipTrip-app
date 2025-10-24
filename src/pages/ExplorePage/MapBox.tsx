import React from "react";
import { Map, LocateMeButton } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import Markers from "./Markers";

const MapBox = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { setBoundingBox } = usePlans();

  return (
    <Map setBoundingBox={setBoundingBox} className={className}>
      <Markers />
      <LocateMeButton />
      {children && children}
    </Map>
  );
};

export default MapBox;
