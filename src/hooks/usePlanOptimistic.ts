import { PlaceType, PlanType } from "@/context/PlanTypes";
import { Place } from "@/types";
import { useReducer } from "react";

type Action =
  | {
      type: "setTitle" | "setDescription";
      payload: string;
    }
  | {
      type: "addImage";
      payload: string;
      init: string[];
    }
  | {
      type: "removePlace";
      payload: string;
      init: PlaceType[];
    }
  | {
      type: "addPlace";
      payload: Place;
      init: PlaceType[];
    };

const reducer = (state: PlanType | null, action: Action): PlanType | null => {
  switch (action.type) {
    case "setTitle":
      return {
        ...state,
        title: action.payload,
      };

    case "setDescription":
      return {
        ...state,
        description: action.payload,
      };

    case "addImage": {
      let images = state?.images || action.init;

      images.push(action.payload);

      return {
        ...state,
        images,
      };
    }

    case "addPlace": {
      let stops = state?.stops || action.init;

      if (!stops.find((p) => p.placeId === action.payload.placeId))
        stops.push(action.payload);

      return { ...state, stops };
    }

    case "removePlace": {
      let stops = state?.stops || action.init;

      return {
        ...state,
        stops: stops.filter((p) => p.placeId !== action.payload),
      };
    }

    default:
      return state;
  }
};

export default function usePlanOptimistic(init: PlanType | null) {
  const [optimisticPlan, dispatch] = useReducer(reducer, init);

  return { optimisticPlan, dispatch };
}
