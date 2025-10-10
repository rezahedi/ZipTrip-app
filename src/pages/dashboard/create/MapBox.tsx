import React from "react";
import { usePlaces } from "@/context/PlacesContext";
import { Map, Markers, LocateMeButton, InfoWindow } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { Place } from "@/types";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { getData } from "@/util";

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

    const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/places/fetch/${placeId}`;
    const place = await getData(URL);
    if (!place || !place.id) return;

    setSelection({
      item: {
        placeId: place.id,
        name: place.displayName.text,
        imageURL: `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`,
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
