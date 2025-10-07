import React, {memo, useEffect} from "react";
import Marker from "./Marker";
import {useMap} from "@vis.gl/react-google-maps";
import {Place, Plan} from "@/types";

const Markers = memo(function Markers({
  items,
  selection,
  setSelection,
  children: infoWindow,
}: {
  items: Place[] | Plan[];
  selection: any;
  setSelection: (item: any) => void;
  children?: React.ReactNode;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selection || selection.source === "marker") return;

    map.panTo({
      lat: selection.plan.startLocation[0],
      lng: selection.plan.startLocation[1],
    });
    // Pan by half the width of the sidebar to the left to center the marker in the visible area.
    map.panBy(-160, 0);
  }, [selection, map]);

  if (!items.length) return null;

  return (
    <>
      {items.map((item) => (
        <Marker key={item._id} item={item} onClick={setSelection} />
      ))}
      {infoWindow}
    </>
  );
});

export default Markers;
