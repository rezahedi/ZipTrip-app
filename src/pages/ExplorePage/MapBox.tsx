import React from "react";
import { Map, LocateMeButton, InfoWindow } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import Markers from "./Markers";
import PlacesMarkers from "./places/PlacesMarkers";
import PlanPopup from "./PlanPopup";
import { Plan } from "@/types";
import Popup from "./places/Popup";

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
      <PlacesMarkers />
      <Markers />
      {selectedPlan && (
        <InfoWindow
          position={selectedPlan.startLocation}
          onClose={handlePopupClose}
        >
          <PlanPopup plan={selectedPlan} />
        </InfoWindow>
      )}
      {!selectedPlan && selection && selection.location && (
        <InfoWindow position={selection.location} onClose={handlePopupClose}>
          <Popup />
        </InfoWindow>
      )}
      <LocateMeButton />
      {children && children}
    </Map>
  );
};

export default MapBox;
