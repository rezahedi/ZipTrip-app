import React, { createContext, useContext, useEffect, useState } from "react";
import { Place, PlanDTO, PlanWithDetail } from "@/types";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import usePlanApi from "@/hooks/usePlanApi";
import usePlanOptimistic from "@/hooks/usePlanOptimistic";

type contextType = {
  plan: PlanWithDetail | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addImage: (image: string) => void;
  setPolyline: (polyline: string) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  setExpense: (placeId: string, expense: number) => void;
  createPlan: (plan: PlanDTO) => void;
  saving: boolean;
  loading: boolean;
  error: string | null;
};

const ItineraryContext = createContext<contextType | undefined>(undefined);

const ItineraryProvider = ({ children }: { children: React.ReactNode }) => {
  const { plan, setPlan, saving, loading, createPlan, getPlan, updatePlan } =
    usePlanApi();
  // const [optimisticPlan, setOptimisticPlan] = useState<PlanType | null>(null);
  const { optimisticPlan, dispatch } = usePlanOptimistic(null);
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
      setPlan({
        ...plan,
        title: optimisticPlan.title || plan.title,
        description: optimisticPlan.description || plan.description,
        images: optimisticPlan.images || plan.images,
        stops: optimisticPlan.stops || plan.stops,
      });
      try {
        await updatePlan(planId, optimisticPlan);
      } catch (err: unknown) {
        setPlan(originalPlan);
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      }
    })();
  }, [optimisticPlan]);

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

    setPlan({ ...plan, images: [...(plan.images || []), image] });

    // dispatch({ type: "addImage", payload: image, init: plan.images || [] });
  };

  const setPolyline = (polyline: string) => {
    if (!plan || !polyline) return;

    setPlan({ ...plan, polyline });
  };

  const addPlace = (place: Place) => {
    if (!plan || !place) return;

    dispatch({ type: "addPlace", payload: place, init: plan.stops || [] });
  };

  const removePlace = (placeId: string) => {
    if (!plan || !placeId) return;

    dispatch({ type: "removePlace", payload: placeId, init: plan.stops || [] });
  };

  const setExpense = (placeId: string, expense: number) => {
    if (!plan || !placeId) return;

    dispatch({
      type: "setExpense",
      payload: { placeId, expense },
      init: plan.stops || [],
    });
  };

  return (
    <ItineraryContext.Provider
      value={{
        plan,
        setPolyline,
        setTitle,
        setDescription,
        addImage,
        addPlace,
        removePlace,
        setExpense,
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
