import useListHook, { ListType } from "@/hooks/useListHook";
import React, { createContext, useContext, useState } from "react";

type ListContextType = {
  placeId: string | null;
  list: ListType[] | null;
  createList: (name: string) => Promise<void>;
  getList: (listId: string) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  addPlaceToList: (listId: string, placeId: string) => Promise<void>;
  removePlaceFromList: (listId: string, placeId: string) => Promise<void>;
  saving: boolean;
  loading: boolean;
  isOpenEditor: boolean;
  isOpenViewer: boolean;
  closeEditor: () => void;
  openEditor: (currentPlaceId: string) => void;
  closeViewer: () => void;
  openViewer: () => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const [isOpenViewer, setIsOpenViewer] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<string | null>(null);
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

  const openEditor = (currentPlaceId: string) => {
    setPlaceId(currentPlaceId);
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
        placeId,
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
