import React from "react";
import {usePlaces} from "@/context/PlacesContext";
import {Map, Markers, LocateMeButton, InfoWindow} from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import {Place} from "@/types";

const MapBox = () => {
  const {places, setBoundingBox, selection, setSelection} = usePlaces();
  const place = selection?.item as Place | undefined;

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <Map setBoundingBox={setBoundingBox}>
      <Markers items={places} selection={selection} setSelection={setSelection}>
        {place && (
          <InfoWindow position={place.location} onClose={handlePopupClose}>
            <PlacePopup />
          </InfoWindow>
        )}
      </Markers>
      <LocateMeButton />
    </Map>
  );
};

export default MapBox;
