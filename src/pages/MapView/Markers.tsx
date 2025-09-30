import React, { useEffect } from "react";
import Marker from "./Marker";
import { useMap } from "@vis.gl/react-google-maps";
import { usePlans } from "./PlansContext";
import InfoWindow from "./InfoWindow";

const Markers = () => {
  const { plans, selectedPlanCard, selectedPlanMarker, setSelectedPlanMarker } =
    usePlans();
  const map = useMap();

  const activePlan = selectedPlanCard || selectedPlanMarker;

  useEffect(() => {
    if (!selectedPlanCard || !map) return;

    map.panTo({
      lat: selectedPlanCard.startLocation[0],
      lng: selectedPlanCard.startLocation[1],
    });
    // Pan by half the width of the sidebar to the left to center the marker in the visible area.
    map.panBy(-160, 0);
  }, [selectedPlanCard, map]);

  if (!plans.length) return null;

  return (
    <>
      {plans.map((plan) => (
        <Marker key={plan._id} plan={plan} onClick={setSelectedPlanMarker} />
      ))}
      {activePlan && (
        <InfoWindow plan={activePlan} setSelected={setSelectedPlanMarker} />
      )}
    </>
  );
};

export default Markers;
