import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchPlans } from "@/util";
import { Plan } from "@/types";
import { useMap } from "@vis.gl/react-google-maps";

type PlansContextType = {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  selectedPlan: Plan | null;
  setSelectedPlan: Dispatch<SetStateAction<Plan | null>>;
  setBoundingBox: Dispatch<
    SetStateAction<google.maps.LatLngBounds | undefined>
  >;
};

const PlansContext = createContext<PlansContextType>({
  plans: [],
  isLoading: false,
  error: null,
  selectedPlan: null,
  setSelectedPlan: () => {},
  setBoundingBox: () => {},
});

const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<
    google.maps.LatLngBounds | undefined
  >();
  const { token } = useAuth();
  const map = useMap();

  // TODO: If want to add loading, error handler or other stuff then better to create a hook like useFetchPlans()
  useEffect(() => {
    const currentBounds = boundingBox || map?.getBounds();
    if (!currentBounds) return;

    (async () => {
      setIsLoading(true);
      const paramsString = createNearbyQueries(currentBounds);
      try {
        const fetchResult = await fetchPlans(
          `plans/nearby/?${paramsString}`,
          token,
          setError,
        );
        setPlans(fetchResult.items || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching data:", error);
      }
    })();
  }, [map, boundingBox]);

  return (
    <PlansContext.Provider
      value={{
        plans,
        isLoading,
        error,
        selectedPlan,
        setSelectedPlan,
        setBoundingBox,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};

const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error("usePlans must be used within a PlansProvider");
  }
  return context;
};

export { PlansProvider, usePlans };

const createNearbyQueries = (bounds: google.maps.LatLngBounds) => {
  const params = new URLSearchParams(location.search);
  const latmin = bounds?.getSouthWest().lat() || 0;
  const lngmin = bounds?.getNorthEast().lng() || 0;
  const latmax = bounds?.getNorthEast().lat() || 0;
  const lngmax = bounds?.getSouthWest().lng() || 0;
  params.set("latmin", latmin.toString());
  params.set("lngmin", lngmin.toString());
  params.set("latmax", latmax.toString());
  params.set("lngmax", lngmax.toString());
  const paramsString = params.toString();
  return paramsString;
};
