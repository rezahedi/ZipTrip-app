import React from "react";
import { Link } from "react-router-dom";
import { Plan } from "@/types";

const PlanPopup = ({ plan }: { plan: Plan }) => {
  return (
    <Link to={`/plans/${plan._id}`}>
      <div className="flex gap-1 w-xs h-32">
        <img
          className="w-24 h-full object-cover rounded-sm"
          src={plan.images[0]}
          alt={plan.title}
        />
        <div className="flex-4/5 max-h-40 px-2">
          {plan.cities && (
            <p className="line-clamp-2 text-foreground/70 font-normal text-xs pt-2">
              {plan.cities.map((city) => (
                <span key={city.placeId}>{city.name}</span>
              ))}
            </p>
          )}
          <h3 className="font-medium text-base/snug text-balance py-1">
            {plan.title}
          </h3>
          <p className="text-foreground/70 font-normal text-sm">
            {plan.stopCount} stops
            {plan.distance ? ` . ${plan.distance} ml` : ""}
            {plan.duration ? ` . ${plan.duration} hr` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlanPopup;
