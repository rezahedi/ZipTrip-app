import PlanCard from "@/Components/Common/PlanCard";
import React from "react";
import { usePlans } from "./PlansContext";

const SidebarOverlay = () => {
  const { plans, isLoading, selectedPlan, setSelectedPlan } = usePlans();

  return (
    <div className="bg-background p-4 m-3 w-md h-[calc(100vh-170px)] rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-medium text-lg">Explore Plans</h2>
        {plans.length > 0 && <span>{plans.length} plans</span>}
      </div>
      {isLoading && <>Loading ...</>}
      {!isLoading && (
        <>
          {plans.length > 0 && (
            <div className="flex flex-col gap-4 overflow-y-scroll h-[100] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {plans.map((plan) => (
                <PlanCard key={plan._id} {...plan} image={plan.images[0]} />
              ))}
            </div>
          )}
          {plans.length === 0 && (
            <p className="text-base">
              There is no plans in this location!
              <br /> Zoom out or drag map to other places.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SidebarOverlay;
