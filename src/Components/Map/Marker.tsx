import React, { memo } from "react";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";
import { itemType, setSelectionType } from "./types";
import { getMarkerIcon } from "@/types/map";

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
    const iconURL = "/places/emoji_marker.svg"; //`/places/${getMarkerIcon(("type" in item && item.type) || "")}`;
    const emoji = getMarkerIcon(("type" in item && item.type) || "");

    return (
      <GMapMarker
        label={emoji}
        title={"name" in item ? item.name : item.title}
        position={{ lat: position[0], lng: position[1] }}
        onClick={handleClick}
        icon={{
          url: iconURL,
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(40, 40),
          // eslint-disable-next-line no-undef
          anchor: new google.maps.Point(20, 40),
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.item._id === nextProps.item._id,
);

export default Marker;
