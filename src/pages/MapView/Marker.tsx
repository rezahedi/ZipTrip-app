import React, { memo, Dispatch, SetStateAction } from "react";
import { Plan } from "@/types";
import { Marker as GMapMarker } from "@vis.gl/react-google-maps";
import { SelectionType } from "./PlansContext";

const Marker = memo(
  function Marker({
    plan,
    onClick,
  }: {
    plan: Plan;
    onClick: Dispatch<SetStateAction<SelectionType | null>>;
  }) {
    const handleClick = () => {
      onClick({ plan, source: "marker" });
    };

    return (
      <GMapMarker
        key={plan._id}
        title={plan.title}
        position={{ lat: plan.startLocation[0], lng: plan.startLocation[1] }}
        onClick={handleClick}
        icon={{
          url: "./images/MarkerIcon.svg",
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32),
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.plan._id === nextProps.plan._id,
);

export default Marker;
