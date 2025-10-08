import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {Place} from "@/types";

type contextType = {
  places: Place[];
  setPlaces: Dispatch<SetStateAction<Place[]>>;
  addNewPlace: (place: Place) => void;
  removePlace?: (placeId: string) => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

const ItineraryContext = createContext<contextType>({
  places: [],
  setPlaces: () => {},
  addNewPlace: () => {},
  removePlace: () => {},
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
});

const ItineraryProvider = ({children}: {children: React.ReactNode}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addNewPlace = (place: Place) => {
    setPlaces((prev) => {
      // Avoid adding duplicates
      if (prev.find((p) => p._id === place._id)) {
        return prev;
      }
      return [...prev, place];
    });
  };

  const removePlace = (placeId: string) => {
    setPlaces((prev) => prev.filter((p) => p._id !== placeId));
  };

  return (
    <ItineraryContext.Provider
      value={{
        places,
        setPlaces,
        addNewPlace,
        removePlace,
        title,
        setTitle,
        description,
        setDescription,
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

export {ItineraryProvider, useItinerary};
