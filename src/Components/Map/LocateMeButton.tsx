import React from "react";
import { ControlPosition, MapControl, useMap } from "@vis.gl/react-google-maps";
import { LocateFixedIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

const ZOOMED_MAP = 13;

const LocateMeButton = ({
  zoomOnLocate = ZOOMED_MAP,
}: {
  zoomOnLocate?: number;
}) => {
  const map = useMap();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      const success = (pos: GeolocationPosition) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        map?.panTo({ lat, lng });
        map?.setZoom(zoomOnLocate);

        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            defaultCenter: { lat, lng },
            defaultZoom: zoomOnLocate,
          }),
        );
      };
      // TODO: Consider using a toast notification or inline message to inform users when geolocation fails
      const error = (err: GeolocationPositionError) => {
        if (err.code === GeolocationPositionError.PERMISSION_DENIED)
          console.log("Permission Denied");
        if (err.code === GeolocationPositionError.POSITION_UNAVAILABLE)
          console.log("Position Unavailable");
        if (err.code === GeolocationPositionError.TIMEOUT)
          console.log("Location Timeout");
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  return (
    <MapControl position={ControlPosition.RIGHT_TOP}>
      <Button
        onClick={handleGetLocation}
        className="bg-background text-foreground/60 mx-2.5 p-1 size-10 rounded-xs shadow"
      >
        <LocateFixedIcon className="size-6" />
      </Button>
    </MapControl>
  );
};

export default LocateMeButton;
