import React from "react";
import { Map, InfoWindow, LocateMeButton, Markers } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import { Plan } from "@/types";
import PlanPopup from "./PlanPopup";

const MapBox = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { plans, selection, setSelection, setBoundingBox } = usePlans();
  const plan = selection?.item as Plan | undefined;

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <Map setBoundingBox={setBoundingBox} className={className}>
      <Markers items={plans} selection={selection} setSelection={setSelection}>
        {plan && (
          <InfoWindow position={plan.startLocation} onClose={handlePopupClose}>
            <PlanPopup plan={plan} />
          </InfoWindow>
        )}
      </Markers>
      <LocateMeButton />
      {children && children}
    </Map>
  );
};

export default MapBox;
