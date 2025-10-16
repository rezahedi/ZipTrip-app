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
    const iconURL =
      "iconURL" in item ? `${item.iconURL}.svg` : "/images/MarkerIcon.svg";
    const iconBackground = "iconBackground" in item ? item.iconBackground : "";

    return (
      <GMapMarker
        title={"name" in item ? item.name : item.title}
        position={{ lat: position[0], lng: position[1] }}
        onClick={handleClick}
        icon={{
          url: iconURL,
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(32, 32),
          // eslint-disable-next-line no-undef
          anchor: new google.maps.Point(16, 32),
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.item._id === nextProps.item._id,
);

export default Marker;
