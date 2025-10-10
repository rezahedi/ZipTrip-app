import React, { createContext, useContext, useEffect, useState } from "react";
import { Place } from "@/types";
import { PlanType } from "./PlanTypes";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

type contextType = {
  plan: PlanType | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addPlace: (place: Place) => void;
  removePlace: (placeId: string) => void;
  createPlan: (plan: PlanType) => void;
  loading: boolean;
  error: string | null;
};

const ItineraryContext = createContext<contextType>({
  plan: null,
  setTitle: () => {},
  setDescription: () => {},
  addPlace: () => {},
  removePlace: () => {},
  createPlan: () => {},
  loading: false,
  error: null,
});

const ItineraryProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { planId } = useParams();

  useEffect(() => {
    if (!planId) return;

    getPlan(planId);
  }, [planId]);

  useEffect(() => {
    if (!plan || !planId) return;
    // TODO: Find another way to update plan, because first time plan set after createPlan() or getPlan() this will run and it's pointless
    updatePlan();
  }, [plan]);

  const setTitle = (title: string) => {
    if (!plan && !title) return;
    setPlan((prev) => (prev ? { ...prev, title } : null));
  };

  const setDescription = (description: string) => {
    if (!plan && !description) return;

    setPlan((prev) => (prev ? { ...prev, description } : null));
  };

  const addPlace = (place: Place) => {
    if (!plan) return;

    setPlan((prev) => {
      if (!prev) return null;

      // First stop
      if (!prev.stops)
        return {
          ...prev,
          stops: [place],
        };

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

    setPlan((prev) => {
      if (!prev) return null;
      if (!prev.stops)
        return {
          ...prev,
          stops: [],
        };
      return {
        ...prev,
        stops: prev.stops.filter((p) => p.placeId !== placeId),
      };
    });
  };

  const createPlan = async (plan: PlanType) => {
    if (!user) return setError("You must be logged in to create a plan");
    setLoading(true);
    setError(null);
    try {
      let res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/account/plans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(plan),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create plan");
      }
      setPlan(await res.json());
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error)
        setError(error.message || "Failed to create plan");
      else if (typeof error === "string") setError(error);
      else setError("Failed to create plan");
      setLoading(false);
    }
  };

  const getPlan = async (planId: string) => {
    if (!user) return setError("You must be logged in to edit a plan");
    setLoading(true);
    setError(null);
    try {
      let res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/account/plans/${planId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to get plan");
      }
      setPlan(await res.json());
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error)
        setError(error.message || "Failed to get plan");
      else if (typeof error === "string") setError(error);
      else setError("Failed to get plan");
      setLoading(false);
    }
  };

  const updatePlan = async (): Promise<boolean> => {
    if (!user) {
      setError("You must be logged in to edit a plan");
      return false;
    }
    setLoading(true);
    setError(null);
    try {
      let res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/account/plans/${planId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: plan?.title,
            description: plan?.description,
            stops: plan?.stops,
          }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create plan");
      }
      await res.json();
      setLoading(false);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error)
        setError(error.message || "Failed to create plan");
      else if (typeof error === "string") setError(error);
      else setError("Failed to create plan");
      setLoading(false);
      return false;
    }
  };

  return (
    <ItineraryContext.Provider
      value={{
        plan,
        setTitle,
        setDescription,
        addPlace,
        removePlace,
        createPlan,
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
    throw new Error("useItinerary must be used within a ItineraryProvider");
  }
  return context;
};

export { ItineraryProvider, useItinerary };
