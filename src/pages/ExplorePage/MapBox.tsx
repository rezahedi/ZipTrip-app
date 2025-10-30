import React from "react";
import { Map, LocateMeButton, InfoWindow } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import Markers from "./Markers";
import PlacesMarkers from "./places/PlacesMarkers";
import PlanPopup from "./PlanPopup";
import { Plan } from "@/types";
import Popup from "./places/Popup";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { ListProvider } from "@/context/ListContext";

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

  const handleMapClick = async (e: MapMouseEvent) => {
    e.stop();
    const placeId = e.detail.placeId;
    const location: [number, number] | null = e.detail.latLng
      ? [e.detail.latLng?.lat, e.detail.latLng?.lng]
      : null;
    if (!placeId || !location) return;

    setSelection({ placeId, location, source: "marker" });
  };

  return (
    <Map
      setBoundingBox={setBoundingBox}
      className={className}
      onClick={handleMapClick}
    >
      <ListProvider>
        {children && children}
        <PlacesMarkers />
        {!selectedPlan && selection && selection.location && (
          <InfoWindow position={selection.location} onClose={handlePopupClose}>
            <Popup />
          </InfoWindow>
        )}
      </ListProvider>
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
    </Map>
  );
};

export default MapBox;
