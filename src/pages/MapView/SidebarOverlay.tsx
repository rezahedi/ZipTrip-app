import PlanCard from "@/Components/Common/PlanCard";
import React from "react";
import { usePlans } from "./PlansContext";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { Button } from "@/Components/ui/button";
import { useMap } from "@vis.gl/react-google-maps";
import { useIsMobile } from "@/hooks/use-mobile";

const SidebarOverlay = () => {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  const { plans, isLoading, selectedPlan, setSelectedPlan } = usePlans();
  const map = useMap();

  const handleZoomOut = () => {
    if (!map) return;

    const currentZoomLevel = map.getZoom();
    if (currentZoomLevel) map.setZoom(currentZoomLevel - 1);
  };

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
            <PlanCard key={plan._id} {...plan} image={plan.images[0]} />
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
