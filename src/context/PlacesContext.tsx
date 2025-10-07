import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {useAuth} from "@/context/AuthContext";
import {fetchPlans} from "@/util";
import {Place} from "@/types";
import {useMap} from "@vis.gl/react-google-maps";
import {selectionType} from "@/Components/Map/types";

type PlacesContextType = {
  places: Place[];
  isLoading: boolean;
  error: string | null;
  selection: selectionType | null;
  setSelection: Dispatch<SetStateAction<selectionType | null>>;
  setBoundingBox: Dispatch<
    SetStateAction<google.maps.LatLngBounds | undefined>
  >;
};

const PlacesContext = createContext<PlacesContextType>({
  places: [],
  isLoading: false,
  error: null,
  selection: null,
  setSelection: () => {},
  setBoundingBox: () => {},
});

const PlacesProvider = ({children}: {children: React.ReactNode}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selection, setSelection] = useState<selectionType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<
    google.maps.LatLngBounds | undefined
  >();
  const {token} = useAuth();
  const map = useMap();

  useEffect(() => {
    setSelection(null);
  }, [boundingBox]);

  // TODO: If want to add loading, error handler or other stuff then better to create a hook like useFetchPlaces()
  useEffect(() => {
    const currentBounds = boundingBox || map?.getBounds();
    if (!currentBounds) return;

    (async () => {
      setIsLoading(true);
      const paramsString = createNearbyQueries(currentBounds);
      try {
        const fetchResult = await fetchPlans(
          `places/nearby/?${paramsString}`,
          token,
          setError
        );
        setPlaces(fetchResult.items || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(
          error instanceof Error ? error.message : "Failed to fetch places"
        );
      }
    })();
  }, [map, boundingBox]);

  return (
    <PlacesContext.Provider
      value={{
        places,
        isLoading,
        error,
        selection,
        setSelection,
        setBoundingBox,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error("usePlaces must be used within a PlacesProvider");
  }
  return context;
};

export {PlacesProvider, usePlaces};

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
