import React, { memo } from "react";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";

type EventsFunctionType = (
  placeId?: string,
  location?: [number, number],
) => void;

const Marker = memo(function Marker({
  placeId,
  emoji = "",
  title,
  position,
  iconURL = "/places/emoji_marker.svg",
  onClick,
  onMouseOver,
  onMouseOut,
  zIndex = null,
}: {
  placeId: string;
  emoji?: string;
  title: string;
  position: [number, number];
  iconURL?: string;
  onClick?: EventsFunctionType;
  onMouseOver?: EventsFunctionType;
  onMouseOut?: EventsFunctionType;
  zIndex?: number | null | undefined;
}) {
  const handleClick = () => {
    if (onClick) onClick(placeId, position);
  };

  const handleMouseHover = () => {
    if (onMouseOver) onMouseOver(placeId, position);
  };

  const handleMouseOut = () => {
    if (onMouseOut) onMouseOut(placeId, position);
  };

  return (
    <GMapMarker
      label={emoji}
      title={title}
      position={{ lat: position[0], lng: position[1] }}
      onClick={handleClick}
      onMouseOver={handleMouseHover}
      onMouseOut={handleMouseOut}
      icon={{
        url: iconURL,
        // eslint-disable-next-line no-undef
        scaledSize: new google.maps.Size(40, 40),
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(20, 40),
      }}
      zIndex={zIndex}
    />
  );
});

export default Marker;
