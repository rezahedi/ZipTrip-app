import React, { useRef, useEffect, useCallback } from "react";
import PlanCard from "@/Components/Common/PlanCard";
import { usePlans } from "./PlansContext";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { Button } from "@/Components/ui/button";
import { useMap } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";
import { HIDE_SCROLL_BAR_STYLE } from "@/constants";

const SidebarOverlay = ({ className = "" }: { className?: string }) => {
  const { plans, isLoading, selection, setSelection } = usePlans();
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

  // Scroll to the plan card that selected by clicking on related marker
  useEffect(() => {
    if (!selection || selection.source === "card") return;

    const targetElement = getPlanRef(selection.placeId);
    if (!targetElement) return;

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selection]);

  const handleZoomOut = () => {
    if (!map) return;

    const currentZoomLevel = map.getZoom();
    if (currentZoomLevel && currentZoomLevel > 1) {
      map.setZoom(currentZoomLevel - 1);
    }
  };

  return (
    <div
      className={cn(
        `bg-background p-4 md:m-3 w-full md:w-xs lg:w-sm h-[calc(100vh-6rem)] rounded-lg shadow-md flex flex-col`,
        className,
      )}
    >
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-medium text-lg">Explore Plans</h2>
        {plans.length > 0 && <span>{plans.length} plans</span>}
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col gap-4 overflow-y-scroll",
          HIDE_SCROLL_BAR_STYLE,
        )}
      >
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
              onMouseEnter={() =>
                setSelection({ placeId: plan._id, source: "card" })
              }
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
