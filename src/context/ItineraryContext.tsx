import React, { createContext, useContext, useEffect, useState } from "react";
import { Place } from "@/types";
import { PlanType } from "./PlanTypes";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import usePlanApi from "@/hooks/usePlanApi";

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
  const [optimisticPlan, setOptimisticPlan] = useState<PlanType | null>(null);
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
    if (!plan && !title) return;
    setOptimisticPlan((prev) => (prev ? { ...prev, title } : { title }));
  };

  const setDescription = (description: string) => {
    if (!plan && !description) return;

    setOptimisticPlan((prev) =>
      prev ? { ...prev, description } : { description },
    );
  };

  const addImage = (image: string) => {
    if (!plan) return;

    setOptimisticPlan((prev) => {
      if (!prev) return null;
      if (!prev.images)
        return {
          ...prev,
          images: [image],
        };
      return {
        ...prev,
        images: [...prev.images, image],
      };
    });
  };

  const addPlace = (place: Place) => {
    if (!plan) return;

    setOptimisticPlan((prev) => {
      // Initialize stops array using plan.stops if not existing in optimisticPlan
      if (!prev || !prev.stops) {
        prev = { ...prev, stops: plan.stops || [] };
      }

      if (!prev.stops) {
        prev.stops = [place];
        return prev;
      }

      // Avoid adding duplicates
      if (prev.stops.find((p) => p.placeId === place.placeId)) {
        return prev;
      }

      // Add new stop to the end
      return {
        ...prev,
        stops: [...prev.stops, place],
      };
    });
  };

  const removePlace = (placeId: string) => {
    if (!plan) return;

    setOptimisticPlan((prev) => {
      // Initialize stops array using plan.stops if not existing in optimisticPlan
      if (!prev || !prev.stops) {
        prev = { ...prev, stops: plan.stops || [] };
      }

      if (!prev.stops) return prev;
      return {
        ...prev,
        stops: prev.stops.filter((p) => p.placeId !== placeId),
      };
    });
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
