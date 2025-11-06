import { Place } from "./../types/index";
import { PlanDTO } from "@/types";
import { useReducer } from "react";

type PartialPlanDTO = Partial<PlanDTO>;

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
      init: Place[];
    }
  | {
      type: "addPlace";
      payload: Place;
      init: Place[];
    }
  | {
      type: "setExpense";
      payload: { placeId: string; expense: number };
      init: Place[];
    };

const reducer = (
  state: PartialPlanDTO | null,
  action: Action,
): PartialPlanDTO | null => {
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
      let images = [...(state?.images || action.init)];

      images.push(action.payload);

      return {
        ...state,
        images,
      };
    }

    case "addPlace": {
      let stops = [...(state?.stops || action.init)];

      if (!stops.find((p) => p.placeId === action.payload.placeId))
        stops.push(action.payload);

      return { ...state, stops };
    }

    case "removePlace": {
      let stops = [...(state?.stops || action.init)];

      return {
        ...state,
        stops: stops.filter((p) => p.placeId !== action.payload),
      };
    }

    case "setExpense": {
      let stops = [...(state?.stops || action.init)];

      return {
        ...state,
        stops: stops.map((p) =>
          p.placeId === action.payload.placeId
            ? {
                ...p,
                expense: action.payload.expense,
              }
            : p,
        ),
      };
    }

    default:
      return state;
  }
};

export default function usePlanOptimistic(init: PlanDTO | null) {
  const [optimisticPlan, dispatch] = useReducer(reducer, init);

  return { optimisticPlan, dispatch };
}
