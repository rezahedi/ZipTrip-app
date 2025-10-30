import React from "react";
import { usePlaces } from "@/context/PlacesContext";
import { Map, LocateMeButton } from "@/Components/Map";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { useItinerary } from "@/context/ItineraryContext";
import { calculateBounds, getBoundsFromViewport } from "@/lib/utils";
import Markers from "./Markers";
import { ListProvider } from "@/context/ListContext";

const MapBox = () => {
  const { setBoundingBox, setSelection } = usePlaces();
  const { plan } = useItinerary();

  const handleMapClick = async (e: MapMouseEvent) => {
    e.stop();
    const placeId = e.detail.placeId;
    const location: [number, number] | null = e.detail.latLng
      ? [e.detail.latLng?.lat, e.detail.latLng?.lng]
      : null;
    if (!placeId || !location) return;

    setSelection({ placeId, location, source: "marker" });
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
      <ListProvider>
        <Markers />
      </ListProvider>
      <LocateMeButton />
    </Map>
  );
};

export default MapBox;
