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
  selectedPlanMarker: Plan | null;
  setSelectedPlanMarker: Dispatch<SetStateAction<Plan | null>>;
  selectedPlanCard: Plan | null;
  setSelectedPlanCard: Dispatch<SetStateAction<Plan | null>>;
  setBoundingBox: Dispatch<
    SetStateAction<google.maps.LatLngBounds | undefined>
  >;
};

const PlansContext = createContext<PlansContextType>({
  plans: [],
  isLoading: false,
  error: null,
  selectedPlanMarker: null,
  setSelectedPlanMarker: () => {},
  selectedPlanCard: null,
  setSelectedPlanCard: () => {},
  setBoundingBox: () => {},
});

const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanMarker, setSelectedPlanMarker] = useState<Plan | null>(
    null,
  );
  const [selectedPlanCard, setSelectedPlanCard] = useState<Plan | null>(null);
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
        setError(
          error instanceof Error ? error.message : "Failed to fetch plans",
        );
      }
    })();
  }, [map, boundingBox]);

  return (
    <PlansContext.Provider
      value={{
        plans,
        isLoading,
        error,
        selectedPlanMarker,
        setSelectedPlanMarker,
        selectedPlanCard,
        setSelectedPlanCard,
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
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  if (!sw || !ne) {
    throw new Error("Invalid bounding box");
  }

  const latmin = sw.lat();
  const lngmin = sw.lng();
  const latmax = ne.lat();
  const lngmax = ne.lng();

  params.set("latmin", latmin.toString());
  params.set("lngmin", lngmin.toString());
  params.set("latmax", latmax.toString());
  params.set("lngmax", lngmax.toString());
  const paramsString = params.toString();
  return paramsString;
};
