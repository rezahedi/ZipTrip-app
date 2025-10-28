import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchData } from "@/util";
import { Place, Plan } from "@/types";
import { useMap } from "@vis.gl/react-google-maps";
import useSelection, {
  SelectionType,
  SetSelectionType,
} from "@/hooks/useSelection";

type ItemType = {
  type: "plan" | "place";
  item: unknown;
};

type PlansContextType = {
  plans: Plan[];
  places: Place[];
  isLoading: boolean;
  error: string | null;
  selection: SelectionType | null;
  setSelection: SetSelectionType;
  placeDetail: SelectionType | null;
  setPlaceDetail: SetSelectionType;
  setBoundingBox: Dispatch<
    // eslint-disable-next-line no-undef
    SetStateAction<google.maps.LatLngBounds | undefined>
  >;
};

const PlansContext = createContext<PlansContextType | undefined>(undefined);

const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const { selection, setSelection } = useSelection(null);
  const { selection: placeDetail, setSelection: setPlaceDetail } =
    useSelection(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<
    // eslint-disable-next-line no-undef
    google.maps.LatLngBounds | undefined
  >();
  const { token } = useAuth();
  const map = useMap();

  useEffect(() => {
    setSelection(null);
  }, [boundingBox]);

  // TODO: If want to add loading, error handler or other stuff then better to create a hook like useFetchPlans()
  useEffect(() => {
    const currentBounds = boundingBox || map?.getBounds();
    if (!currentBounds) return;

    (async () => {
      setIsLoading(true);
      const paramsString = createNearbyQueries(currentBounds);
      try {
        const fetchResult = await fetchData(
          `all/?${paramsString}`,
          token,
          setError,
        );
        const fetchedPlans: ItemType[] =
          fetchResult.items.filter((i: ItemType) => i.type === "plan") || [];
        setPlans(fetchedPlans.map((i: ItemType) => i.item as Plan) || []);
        const fetchedPlaces: ItemType[] =
          fetchResult.items.filter((i: ItemType) => i.type === "place") || [];
        setPlaces(fetchedPlaces.map((i: ItemType) => i.item as Place) || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(
          error instanceof Error ? error.message : "Failed to fetch plans",
        );
      }
    })();
  }, [map, boundingBox, token]);

  return (
    <PlansContext.Provider
      value={{
        plans,
        places,
        isLoading,
        error,
        selection,
        setSelection,
        placeDetail,
        setPlaceDetail,
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
    throw new Error("usePlans must be used within its provider");
  }
  return context;
};

export { PlansProvider, usePlans };

// eslint-disable-next-line no-undef
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
