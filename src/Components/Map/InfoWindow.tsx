import React from "react";
import {InfoWindow as GMapInfoWindow} from "@vis.gl/react-google-maps";
import {XIcon} from "lucide-react";

const InfoWindow = ({
  position,
  onClose,
  children,
}: {
  position: [number, number];
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <GMapInfoWindow
      headerDisabled
      pixelOffset={[0, -30]}
      position={{
        lat: position[0],
        lng: position[1],
      }}
      onClose={() => onClose()}
    >
      <button
        className="absolute top-2 right-2 text-foreground/60 cursor-pointer"
        onClick={() => onClose()}
      >
        <XIcon />
      </button>
      {children}
    </GMapInfoWindow>
  );
};

export default InfoWindow;
