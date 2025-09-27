import React, { useEffect, useRef } from "react";
import { Plan } from "@/types";
import { Marker as GMapMarker, useMap } from "@vis.gl/react-google-maps";

const Marker = ({
  plan,
  onClick,
}: {
  plan: Plan;
  onClick: React.Dispatch<React.SetStateAction<Plan | null>>;
}) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    console.log("Marker");
  }, []);

  const handleClick = () => {
    onClick(plan);
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
