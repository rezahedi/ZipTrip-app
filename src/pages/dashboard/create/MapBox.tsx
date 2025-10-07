import React from "react";
import {usePlaces} from "@/context/PlacesContext";
import {Map, Markers, LocateMeButton, InfoWindow} from "@/Components/Map";
import PlacePopup from "./PlacePopup";

const MapBox = () => {
  const {places, setBoundingBox, selection, setSelection} = usePlaces();

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <Map setBoundingBox={setBoundingBox}>
      <Markers items={places} selection={selection} setSelection={setSelection}>
        {selection && (
          <InfoWindow
            position={selection.item.location}
            onClose={handlePopupClose}
          >
            <PlacePopup />
          </InfoWindow>
        )}
      </Markers>
      <LocateMeButton />
    </Map>
  );
};

export default MapBox;
