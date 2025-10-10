import React, { memo } from "react";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";
import { itemType, setSelectionType } from "./types";

const Marker = memo(
  function Marker({
    item,
    onClick,
  }: {
    item: itemType;
    onClick: setSelectionType;
  }) {
    const handleClick = () => {
      onClick({ item, source: "marker" });
    };

    const position = "location" in item ? item.location : item.startLocation;

    return (
      <GMapMarker
        title={"name" in item ? item.name : item.title}
        position={{ lat: position[0], lng: position[1] }}
        onClick={handleClick}
        icon={{
          url: "/images/MarkerIcon.svg",
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32),
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.item._id === nextProps.item._id,
);

export default Marker;
