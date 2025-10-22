import React from "react";
import { usePlaces } from "@/context/PlacesContext";
import { Map, Markers, LocateMeButton, InfoWindow } from "@/Components/Map";
import PlacePopup from "./PlacePopup";
import { Place } from "@/types";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { useItinerary } from "@/context/ItineraryContext";
import { calculateBounds, getBoundsFromViewport } from "@/lib/utils";

const MapBox = () => {
  const { places, setBoundingBox, selection, setSelection } = usePlaces();
  const place = selection?.item as Place | undefined;
  const { plan } = useItinerary();

  const handlePopupClose = () => {
    setSelection(null);
  };

  const handleMapClick = async (e: MapMouseEvent) => {
    e.stop();
    const placeId = e.detail.placeId;
    const placeLocation = e.detail.latLng;
    if (!placeId || !placeLocation) return;

    setSelection({
      item: {
        placeId,
        name: "",
        location: [placeLocation.lat, placeLocation.lng],
        country: "",
        imageURL: "",
        address: "",
        type: "",
        iconURL: "",
        iconBackground: "",
        summary: "",
        reviewSummary: "",
        rating: 0,
        userRatingCount: 0,
      },
      source: "marker",
    });
  };

  if (!plan) return null;

  let defaultBounds;
  if (plan.stops && plan.stops?.length > 2) {
    // TODO: Calculate bounds from stops + buffer zone
    defaultBounds =
      calculateBounds(plan.stops.map((s) => s.location)) || undefined;
  } else if (plan.cities?.[0]?.viewport) {
    defaultBounds = getBoundsFromViewport(plan.cities[0].viewport);
  }

  return (
    <Map
      setBoundingBox={setBoundingBox}
      onClick={handleMapClick}
      defaultBounds={defaultBounds}
      className="w-full flex-5/12 md:flex-auto"
    >
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
