import React, { memo, Dispatch, SetStateAction } from "react";
import { Plan } from "@/types";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";

const Marker = memo(
  ({
    plan,
    onClick,
  }: {
    plan: Plan;
    onClick: Dispatch<SetStateAction<Plan | null>>;
  }) => {
    const handleClick = () => {
      onClick(plan);
    };

    return (
      <GMapMarker
        key={plan._id}
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
  },
  (prevProps, nextProps) => prevProps.plan._id === nextProps.plan._id,
);

export default Marker;
