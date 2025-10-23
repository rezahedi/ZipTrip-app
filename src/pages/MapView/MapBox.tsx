import React from "react";
import { Map, InfoWindow, LocateMeButton } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import { Plan } from "@/types";
import PlanPopup from "./PlanPopup";
import Markers from "./Markers";

const MapBox = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { plans, selection, setSelection, setBoundingBox } = usePlans();
  const selectedPlan: Plan | null =
    plans.find((p) => p._id === selection?.placeId) || null;

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <Map setBoundingBox={setBoundingBox} className={className}>
      <Markers />
      {selectedPlan && (
        <InfoWindow
          position={selectedPlan.startLocation}
          onClose={handlePopupClose}
        >
          <PlanPopup plan={selectedPlan} />
        </InfoWindow>
      )}
      <LocateMeButton />
      {children && children}
    </Map>
  );
};

export default MapBox;
