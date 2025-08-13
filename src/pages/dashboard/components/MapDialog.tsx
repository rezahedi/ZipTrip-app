import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

import { useMap, Map, Marker, MapMouseEvent } from "@vis.gl/react-google-maps";
import AutocompleteWebComponent from "./AutocompleteWebComponent";
import { PassingStop } from "@/util/dashboard";

// Default center and zoom level to show entire United States on the map
const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 };
const DEFAULT_ZOOM = 4;

const MapDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (stop: PassingStop) => void;
}) => {
  const dummyDiv = useRef(null);
  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(
    null,
  );
  const [placeId, setPlaceId] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<PassingStop | null>(null);
  const [autocompleteBounds, setAutocompleteBounds] =
    useState<google.maps.LatLngBounds | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!autocompleteBounds || !map) return;
    map.fitBounds(autocompleteBounds);
  }, [autocompleteBounds]);

  const handleMapClick = (e: MapMouseEvent) => {
    if (!e.detail.placeId) return;
    setSelected(e.detail.latLng);
    setPlaceId(e.detail.placeId);
  };

  useEffect(() => {
    if (!placeId || !window.google || !dummyDiv.current) return;

    const service = new window.google.maps.places.PlacesService(
      dummyDiv.current,
    );

    service.getDetails(
      {
        placeId,
        fields: [
          "name",
          "formatted_address",
          "geometry.location",
          "photos",
          "place_id",
        ],
      },
      (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const location = place.geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const imageURL = place.photos?.[0]?.getUrl({ maxWidth: 400 }) || "";

          setSelectedPlace({
            name: place.name || "",
            address: place.formatted_address || "",
            location: [lat, lng],
            imageURL,
            description: "",
            sequence: 0,
          });
        } else {
          console.warn("Failed to fetch place details:", status);
        }
      },
    );
  }, [placeId]);

  const handleAdd = () => {
    if (!selectedPlace) return;
    onConfirm(selectedPlace);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="px-3 py-8 w-full h-full sm:max-w-xl max-w-full sm:h-auto rounded-none sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Select a Place</DialogTitle>
        </DialogHeader>
        <div className="h-[500px]">
          <AutocompleteWebComponent onPlaceSelect={setAutocompleteBounds} />
          <Map
            defaultCenter={
              selected
                ? { lat: selected.lat, lng: selected.lng }
                : DEFAULT_CENTER
            }
            defaultZoom={selected ? 15 : DEFAULT_ZOOM}
            style={{ width: "100%", height: "90%" }}
            onClick={handleMapClick}
            disableDefaultUI={false}
            gestureHandling="greedy"
            streetViewControl={false}
          >
            {selected && (
              <Marker position={{ lat: selected.lat, lng: selected.lng }} />
            )}
          </Map>
          <div ref={dummyDiv} style={{ display: "none" }} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!placeId}
            autoFocus
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
