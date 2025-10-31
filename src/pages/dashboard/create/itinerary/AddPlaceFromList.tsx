import { Button } from "@/Components/ui/button";
import { useList } from "@/context/ListContext";
import ListViewer from "@/pages/ExplorePage/places/list/ListViewer";
import { Place } from "@/types";
import React from "react";

const AddPlaceFromList = ({
  onAddPlace,
  children,
}: {
  onAddPlace: (place: Place) => void;
  children?: React.ReactNode;
}) => {
  const { closeViewer, openViewer } = useList();

  const handlePlaceSelect = (place: Place) => {
    onAddPlace(place);
    closeViewer();
  };

  return (
    <>
      <Button onClick={openViewer}>{children}</Button>
      <ListViewer onPlaceSelect={handlePlaceSelect} />
    </>
  );
};

export default AddPlaceFromList;
