import React from "react";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";
import { SetSelectionType } from "@/hooks/useSelection";

const Marker = ({
  placeId,
  emoji = "",
  title,
  position,
  iconURL = "/places/emoji_marker.svg",
  onClick,
}: {
  placeId: string;
  emoji?: string;
  title: string;
  position: [number, number];
  iconURL?: string;
  onClick: SetSelectionType;
}) => {
  const handleClick = () => {
    onClick({ placeId, location: position, source: "marker" });
  };

  return (
    <GMapMarker
      label={emoji}
      title={title}
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
};

export default Marker;
