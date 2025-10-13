import React from "react";
import { usePlaces } from "@/context/PlacesContext";
import { Map, Markers, LocateMeButton, InfoWindow } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { Place } from "@/types";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { fetchData } from "@/util";

const MapBox = () => {
  const { places, setBoundingBox, selection, setSelection } = usePlaces();
  const place = selection?.item as Place | undefined;

  const handlePopupClose = () => {
    setSelection(null);
  };

  const handleMapClick = async (e: MapMouseEvent) => {
    e.stop();
    const placeId = e.detail.placeId;
    const placeLocation = e.detail.latLng;
    if (!placeId || !placeLocation) return;

    const URL = `places/fetch/${placeId}`;
    const place = await fetchData(URL, null, () => {});
    if (!place || !place.id) return;

    setSelection({
      item: {
        placeId: place.id,
        name: place.displayName.text,
        imageURL: place.photos?.[0]?.imageURL || "",
        location: [placeLocation.lat, placeLocation.lng],
        address: place.formattedAddress,
      },
      source: "marker",
    });
  };

  return (
    <Map setBoundingBox={setBoundingBox} onClick={handleMapClick}>
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
