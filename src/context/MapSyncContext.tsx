import useSelection, {
  SelectionType,
  SetSelectionType,
} from "@/hooks/useSelection";
import React, { createContext, useContext } from "react";

// TODO: Store only placeId in selection {placeId: string, source: 'marker' | 'list'} and fetch full item data from existed list using placeId.
// TODO: Create a factory function by wrapping the context/provider creation to build typed providers/hooks for different selection item types.
/* Example implementation:
  export interface MapSyncContextValue<T> {
    selection: T | null;
    setSelection: (item: T | null) => void;
  }
  export function createMapSyncContext<T>() {
    const Context = createContext<MapSyncContextValue<T> | undefined>(undefined);
    ...
 */

type ContextType = {
  selection: SelectionType | null;
  setSelection: SetSelectionType;
};

const MapSyncContext = createContext<ContextType | undefined>(undefined);

const MapSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const { selection, setSelection } = useSelection(null);

  return (
    <MapSyncContext.Provider value={{ selection, setSelection }}>
      {children}
    </MapSyncContext.Provider>
  );
};

const useMapSync = () => {
  const context = useContext(MapSyncContext);
  if (!context) {
    throw new Error("useMapSync must be used within it's provider");
  }
  return context;
};

export { MapSyncProvider, useMapSync };
