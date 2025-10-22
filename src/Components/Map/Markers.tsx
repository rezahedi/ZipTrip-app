import React, { memo, useEffect } from "react";
import Marker from "./Marker";
import { useMap } from "@vis.gl/react-google-maps";
import {
  itemsType,
  selectionType,
  setSelectionType,
} from "@/Components/Map/types";

const Markers = memo(function Markers({
  items,
  selection,
  setSelection,
  children: infoWindow,
}: {
  items: itemsType;
  selection: selectionType | null;
  setSelection: setSelectionType;
  children?: React.ReactNode;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selection || selection.source === "marker") return;

    const position =
      "location" in selection.item
        ? selection.item.location
        : selection.item.startLocation;

    map.panTo({
      lat: position[0],
      lng: position[1],
    });
    // Pan by half the width of the sidebar to the left to center the marker in the visible area.
    map.panBy(-160, 0);
  }, [selection, map]);

  return (
    <>
      {items.length > 0 &&
        items.map((item) => (
          <Marker
            key={"placeId" in item ? item.placeId : item._id}
            item={item}
            onClick={setSelection}
          />
        ))}
      {infoWindow}
    </>
  );
});

export default Markers;
