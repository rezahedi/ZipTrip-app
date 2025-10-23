import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Place, Stop as StopType } from "@/types";
import { calculateBounds, getThemeColor } from "@/lib/utils";
import { InfoWindow, Marker } from "@/Components/Map";
import { itemType } from "@/Components/Map/types";
import { useMapSync } from "@/context/MapSyncContext";

const MarkersAndPath = ({ stops }: { stops: StopType[] }) => {
  const { selection, setSelection } = useMapSync();
  const place = selection?.item as Place | undefined;

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <>
      {stops.length > 0 &&
        stops.map((stop) => (
          <Marker
            key={stop.placeId}
            item={stop as itemType}
            onClick={setSelection}
          />
        ))}
      {place && (
        <InfoWindow position={place.location} onClose={handlePopupClose}>
          <div className="flex gap-1 sm:w-xs sm:h-32">
            <img
              className="w-24 h-full object-cover rounded-sm hidden sm:block"
              src={place.imageURL}
              alt={place.name}
            />
            <div className="flex-4/5 max-h-40 px-2">
              <h3 className="font-medium text-base/snug text-balance py-1">
                {place.name}
              </h3>
              <p>{place.address}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

const StopsOnMap = ({
  className,
  stops,
}: {
  className: string;
  stops: StopType[];
}) => {
  const defaultBounds =
    calculateBounds(stops.map((s) => s.location)) || undefined;

  return (
    <div className={className}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Map
          defaultBounds={defaultBounds}
          defaultZoom={4}
          style={{ width: "100%", height: "100%" }}
          gestureHandling="cooperative"
          streetViewControl={false}
          fullscreenControl={false}
          colorScheme={getThemeColor()}
        >
          <MarkersAndPath stops={stops} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default StopsOnMap;
