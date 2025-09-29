import React from "react";
import { Link } from "react-router-dom";
import Marker from "./Marker";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { XIcon } from "lucide-react";
import { usePlans } from "./PlansContext";

const Markers = () => {
  const { plans, selectedPlan, setSelectedPlan } = usePlans();

  if (!plans.length) return null;

  return (
    <>
      {plans.map((plan) => (
        <Marker key={plan._id} plan={plan} onClick={setSelectedPlan} />
      ))}
      {selectedPlan && (
        <InfoWindow
          headerDisabled
          position={{
            lat: selectedPlan.startLocation[0],
            lng: selectedPlan.startLocation[1],
          }}
          onClose={() => setSelectedPlan(null)}
        >
          <button
            className="absolute top-2 right-2 text-foreground/60 cursor-pointer"
            onClick={() => setSelectedPlan(null)}
          >
            <XIcon />
          </button>
          <Link to={`/plans/${selectedPlan._id}`}>
            <div className="flex gap-1 w-xs h-32">
              <img
                className="w-24 h-full object-cover rounded-sm"
                src={selectedPlan.images[0]}
                alt={selectedPlan.title}
              />
              <div className="flex-4/5 max-h-40 px-2">
                <h5 className="text-foreground/70 font-normal text-sm">
                  {selectedPlan.categoryId.name}
                </h5>
                <h3 className="font-medium text-base/snug text-balance py-1">
                  {selectedPlan.title}
                </h3>
                <p className="text-foreground/70 font-normal text-sm">
                  {selectedPlan.stopCount} stops . {selectedPlan.distance} ml .{" "}
                  {selectedPlan.duration} hr
                </p>
              </div>
            </div>
          </Link>
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
