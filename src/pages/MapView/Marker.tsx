import React, { useEffect, useRef } from "react";
import { Plan } from "@/types";
import {
  Marker as GMapMarker,
  useMap,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

let sharedInfoWindow: google.maps.InfoWindow | null = null;

const Marker = ({ plan }: { plan: Plan }) => {
  const map = useMap();
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!sharedInfoWindow && window.google) {
      sharedInfoWindow = new google.maps.InfoWindow();
    }
  }, []);

  const handleClick = () => {
    if (!sharedInfoWindow) return;

    sharedInfoWindow.setContent(`
      <div style="max-width:260px">
        <img src="${plan.images[0]}" alt="${plan.title}" style="width:100%;height:auto;border-radius:4px;" />
        <h3>${plan.title}</h3>
      </div>
    `);
    sharedInfoWindow.open(map, markerRef.current);
  };

  return (
    <GMapMarker
      key={plan._id}
      ref={markerRef}
      title={plan.title}
      position={{ lat: plan.startLocation[0], lng: plan.startLocation[1] }}
      onClick={handleClick}
      icon={{
        url: "./images/MarkerIcon.svg",
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 32),
      }}
    />
  );
};

export default Marker;
