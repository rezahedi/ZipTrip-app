import React, { memo, useEffect } from "react";
import Marker from "./Marker";
import { useMap } from "@vis.gl/react-google-maps";
import { usePlans } from "./PlansContext";
import InfoWindow from "./InfoWindow";

const Markers = memo(function Markers() {
  const { plans, selection, setSelection } = usePlans();
  const map = useMap();

  useEffect(() => {
    if (!map || !selection || selection.source === "marker") return;

    map.panTo({
      lat: selection.plan.startLocation[0],
      lng: selection.plan.startLocation[1],
    });
    // Pan by half the width of the sidebar to the left to center the marker in the visible area.
    map.panBy(-160, 0);
  }, [selection, map]);

  if (!plans.length) return null;

  return (
    <>
      {plans.map((plan) => (
        <Marker key={plan._id} plan={plan} onClick={setSelection} />
      ))}
      {selection && (
        <InfoWindow plan={selection.plan} setSelection={setSelection} />
      )}
    </>
  );
});

export default Markers;
