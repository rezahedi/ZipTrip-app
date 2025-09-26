import React from "react";
import { Plan } from "@/types";
import { Marker as GMapMarker, useMap } from "@vis.gl/react-google-maps";

const Marker = ({ plan }: { plan: Plan }) => {
  const map = useMap();

  return (
    <GMapMarker
      key={plan._id}
      title={plan.title}
      position={{ lat: plan.startLocation[0], lng: plan.startLocation[1] }}
      icon={{
        url: "./images/MarkerIcon.svg",
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 32),
      }}
    />
  );
};

export default Marker;
