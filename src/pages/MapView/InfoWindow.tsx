import React, {Dispatch, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {InfoWindow as GMapInfoWindow} from "@vis.gl/react-google-maps";
import {XIcon} from "lucide-react";
import {Plan} from "@/types";
import {SelectionType} from "./PlansContext";

const InfoWindow = ({
  plan,
  setSelection,
}: {
  plan: Plan;
  setSelection: Dispatch<SetStateAction<SelectionType | null>>;
}) => {
  return (
    <GMapInfoWindow
      headerDisabled
      pixelOffset={[0, -30]}
      position={{
        lat: plan.startLocation[0],
        lng: plan.startLocation[1],
      }}
      onClose={() => setSelection(null)}
    >
      <button
        className="absolute top-2 right-2 text-foreground/60 cursor-pointer"
        onClick={() => setSelection(null)}
      >
        <XIcon />
      </button>
      <Link to={`/plans/${plan._id}`}>
        <div className="flex gap-1 w-xs h-32">
          <img
            className="w-24 h-full object-cover rounded-sm"
            src={plan.images[0]}
            alt={plan.title}
          />
          <div className="flex-4/5 max-h-40 px-2">
            {/* <h5 className="text-foreground/70 font-normal text-sm">
              {plan.categoryId.name}
            </h5> */}
            <h3 className="font-medium text-base/snug text-balance py-1">
              {plan.title}
            </h3>
            <p className="text-foreground/70 font-normal text-sm">
              {plan.stopCount} stops . {plan.distance} ml . {plan.duration} hr
            </p>
          </div>
        </div>
      </Link>
    </GMapInfoWindow>
  );
};

export default InfoWindow;
