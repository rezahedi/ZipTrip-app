import React, { useEffect } from "react";
import { InfoWindow, Marker } from "@/Components/Map";
import { useMap } from "@vis.gl/react-google-maps";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePlans } from "./PlansContext";
import { Plan } from "@/types";
import PlanPopup from "./PlanPopup";

const Markers = function Markers() {
  const map = useMap();
  const { isMobile } = useMediaQuery();
  const { plans, selection, setSelection } = usePlans();
  const selectedPlan: Plan | null =
    plans.find((p) => p._id === selection?.placeId) || null;

  const handlePopupClose = () => {
    setSelection(null);
  };

  useEffect(() => {
    if (!map || !selection || selection.source === "marker") return;

    const selectedPlan: Plan | null =
      plans.find((p) => p._id === selection.placeId) || null;
    if (!selectedPlan) return;

    const position = selectedPlan.startLocation;
    if (!isMobile) {
      map.panTo({
        lat: position[0],
        lng: position[1],
      });
      // Pan by half the width of the sidebar to the left to center the marker in the visible area.
      map.panBy(-160, 0);
    }
  }, [selection, map]);

  return (
    <>
      {plans.length > 0 &&
        plans.map((item) => (
          <Marker
            key={item._id}
            placeId={item._id}
            emoji="⚪"
            title={item.title}
            position={item.startLocation}
            iconURL="/places/emoji_marker_red.svg"
            onClick={setSelection}
          />
        ))}
      {selectedPlan && (
        <InfoWindow
          position={selectedPlan.startLocation}
          onClose={handlePopupClose}
        >
          <PlanPopup plan={selectedPlan} />
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
