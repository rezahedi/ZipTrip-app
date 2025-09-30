import React, { useRef, useEffect, useCallback } from "react";
import PlanCard from "@/Components/Common/PlanCard";
import { usePlans } from "./PlansContext";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { Button } from "@/Components/ui/button";
import { useMap } from "@vis.gl/react-google-maps";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plan } from "@/types";

const SidebarOverlay = () => {
  const isMobile = useIsMobile();

  const { plans, isLoading, selectedPlanMarker, setSelectedPlanCard } =
    usePlans();
  const map = useMap();

  // Create a ref to store a Map of plan IDs to their DOM element references
  const planRefs = useRef(new Map());

  // Function to set the ref for a list plan
  const setPlanRef = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      if (element) {
        planRefs.current.set(id, element);
      } else {
        // Clean up the ref when the component unmounts or the plan is removed
        planRefs.current.delete(id);
      }
    },
    [],
  );

  // Function to get a specific ref
  const getPlanRef = (id: string) => {
    return planRefs.current.get(id);
  };

  // Scroll effect
  useEffect(() => {
    if (!selectedPlanMarker) return;
    const targetElement = getPlanRef(selectedPlanMarker._id);
    if (!targetElement) return;

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedPlanMarker]);

  const handleZoomOut = () => {
    if (!map) return;

    const currentZoomLevel = map.getZoom();
    if (currentZoomLevel && currentZoomLevel > 1) {
      map.setZoom(currentZoomLevel - 1);
    }
  };

  if (isMobile) return null;

  return (
    <div className="bg-background p-4 m-3 w-xs lg:w-sm h-[calc(100vh-170px)] rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-medium text-lg">Explore Plans</h2>
        {plans.length > 0 && <span>{plans.length} plans</span>}
      </div>
      <div className="flex-1 flex flex-col gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))}
        {!isLoading &&
          plans.length > 0 &&
          plans.map((plan) => (
            <div
              key={plan._id}
              ref={(element) => setPlanRef(plan._id, element)}
              onMouseOver={() => setSelectedPlanCard(plan)}
              onMouseLeave={() => setSelectedPlanCard(null)}
            >
              <PlanCard {...plan} image={plan.images[0]} />
            </div>
          ))}
        {!isLoading && plans.length === 0 && (
          <div className="h-full flex flex-col gap-4 justify-center items-center mb-20">
            <h3 className="font-medium text-lg">No plan results</h3>
            <p className="text-base text-center text-foreground/70 text-balance">
              There are no plans in this location, Zoom out or drag map to other
              places.
            </p>
            <Button onClick={handleZoomOut}>Zoom out</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarOverlay;
