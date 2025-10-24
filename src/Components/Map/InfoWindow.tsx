import React from "react";
import { InfoWindow as GMapInfoWindow } from "@vis.gl/react-google-maps";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const InfoWindow = ({
  position,
  onClose,
  children,
  className = "",
}: {
  position: [number, number];
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
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
      className={cn("text-foreground/90 dark:text-background/90", className)}
    >
      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => onClose()}
      >
        <XIcon />
      </button>
      {children}
    </GMapInfoWindow>
  );
};

export default InfoWindow;
