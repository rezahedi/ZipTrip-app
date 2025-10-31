import useListHook, { ListType } from "@/hooks/useListHook";
import { Place } from "@/types";
import React, { createContext, useContext, useState } from "react";

type ListContextType = {
  place: Place | null;
  list: ListType[] | null;
  createList: (name: string) => Promise<void>;
  getList: (listId: string) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  addPlaceToList: (listId: string, place: Place) => Promise<void>;
  removePlaceFromList: (listId: string, placeId: string) => Promise<void>;
  saving: boolean;
  loading: boolean;
  isOpenEditor: boolean;
  isOpenViewer: boolean;
  closeEditor: () => void;
  openEditor: (currentPlace: Place) => void;
  closeViewer: () => void;
  openViewer: () => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const [isOpenViewer, setIsOpenViewer] = useState<boolean>(false);
  const [place, setPlace] = useState<Place | null>(null);
  const {
    list,
    createList,
    getList,
    removeList,
    addPlaceToList,
    removePlaceFromList,
    saving,
    loading,
  } = useListHook();

  const closeEditor = () => {
    setIsOpenEditor(false);
  };

  const openEditor = (currentPlace: Place) => {
    setPlace(currentPlace);
    setIsOpenEditor(true);
  };

  const closeViewer = () => {
    setIsOpenViewer(false);
  };

  const openViewer = () => {
    setIsOpenViewer(true);
  };

  return (
    <ListContext.Provider
      value={{
        place,
        list,
        createList,
        getList,
        removeList,
        addPlaceToList,
        removePlaceFromList,
        saving,
        loading,
        isOpenEditor,
        isOpenViewer,
        closeEditor,
        openEditor,
        closeViewer,
        openViewer,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within its provider");
  }
  return context;
};

export { ListProvider, useList };
