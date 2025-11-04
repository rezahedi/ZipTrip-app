import React, { useEffect } from "react";
import { Map, LocateMeButton, InfoWindow } from "@/Components/Map";
import { usePlans } from "./PlansContext";
import Markers from "./Markers";
import PlacesMarkers from "./places/PlacesMarkers";
import PlanPopup from "./PlanPopup";
import { Plan } from "@/types";
import Popup from "./places/Popup";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { fetchData } from "@/util";
import { Polyline } from "@/Components/Map/Polyline";

const MapBox = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const { plans, setPlanPolyline, selection, setSelection, setBoundingBox } =
    usePlans();

  const selectedPlan: Plan | null =
    plans.find((p) => p._id === selection?.placeId) || null;

  useEffect(() => {
    if (!selectedPlan || selectedPlan.polyline) return;

    (async () => {
      // fetch planDetails
      const planDetail: Plan | null = await fetchData(
        `plans/${selectedPlan._id}`,
        null,
        () => {},
      );
      if (!planDetail) return;

      setPlanPolyline(planDetail._id, planDetail.polyline || "");
    })();
  }, [selection]);

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
      {children && children}
      <PlacesMarkers />
      {!selectedPlan && selection && selection.location && (
        <InfoWindow position={selection.location} onClose={handlePopupClose}>
          <Popup />
        </InfoWindow>
      )}
      <Markers />
      {selectedPlan && (
        <>
          <InfoWindow
            position={selectedPlan.startLocation}
            onClose={handlePopupClose}
          >
            <PlanPopup plan={selectedPlan} />
          </InfoWindow>
          {selectedPlan.polyline && (
            <Polyline
              strokeWeight={5}
              strokeOpacity={0.7}
              strokeColor={"#fea403"}
              encodedPath={selectedPlan.polyline}
            />
          )}
        </>
      )}
      <LocateMeButton />
    </Map>
  );
};

export default MapBox;
