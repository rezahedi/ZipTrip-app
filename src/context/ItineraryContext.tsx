import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { Place } from "@/types";
import { PlaceType, PlanType } from "./PlanTypes";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import usePlanApi from "@/hooks/usePlanApi";

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

type contextType = {
  plan: PlanType | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addImage: (image: string) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  createPlan: (plan: PlanType) => void;
  saving: boolean;
  loading: boolean;
  error: string | null;
};

const ItineraryContext = createContext<contextType | undefined>(undefined);

const ItineraryProvider = ({ children }: { children: React.ReactNode }) => {
  const { plan, setPlan, saving, loading, createPlan, getPlan, updatePlan } =
    usePlanApi();
  // const [optimisticPlan, setOptimisticPlan] = useState<PlanType | null>(null);
  const [optimisticPlan, dispatch] = useReducer(reducer, null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { planId } = useParams();

  useEffect(() => {
    if (!planId) return setPlan(null);

    (async () => {
      try {
        await getPlan(planId);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      }
    })();
  }, [planId, token]);

  useEffect(() => {
    if (!planId || !plan || !optimisticPlan) return setPlan(null);

    (async () => {
      const originalPlan = plan;
      // Replace plan's properties with whatever is in optimisticPlan
      setPlan({ ...plan, ...optimisticPlan });
      try {
        await updatePlan(planId, optimisticPlan);
      } catch (err: unknown) {
        setPlan(originalPlan);
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      }
    })();
  }, [optimisticPlan]);

  // TODO: Use useReducer for setTitle, setDescription and etc, to make optimisticPlan update more cleanly

  const setTitle = (title: string) => {
    if (!plan || !title) return;

    dispatch({ type: "setTitle", payload: title });
  };

  const setDescription = (description: string) => {
    if (!plan || !description) return;

    dispatch({ type: "setDescription", payload: description });
  };

  const addImage = (image: string) => {
    if (!plan || !image) return;

    dispatch({ type: "addImage", payload: image, init: plan.images || [] });
  };

  const addPlace = (place: Place) => {
    if (!plan || !place) return;

    dispatch({ type: "addPlace", payload: place, init: plan.stops || [] });
  };

  const removePlace = (placeId: string) => {
    if (!plan || !placeId) return;

    dispatch({ type: "removePlace", payload: placeId, init: plan.stops || [] });
  };

  return (
    <ItineraryContext.Provider
      value={{
        plan,
        setTitle,
        setDescription,
        addImage,
        addPlace,
        removePlace,
        createPlan,
        saving,
        loading,
        error,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within its provider");
  }
  return context;
};

export { ItineraryProvider, useItinerary };
