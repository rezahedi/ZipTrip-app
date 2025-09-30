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
    if (!selectedPlanCard) return;

    map?.panTo({
      lat: selectedPlanCard.startLocation[0],
      lng: selectedPlanCard.startLocation[1],
    });
  }, [selectedPlanCard]);

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
