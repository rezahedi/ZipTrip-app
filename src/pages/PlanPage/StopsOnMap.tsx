import React, { useEffect, useRef, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Place, Stop as StopType } from "@/types";
import { calculateBounds, cn, getThemeColor, throttle } from "@/lib/utils";
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
  className?: string;
  stops: StopType[];
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const defaultBounds =
    calculateBounds(stops.map((s) => s.location)) || undefined;
  const [isFull, setIsFull] = useState<boolean>(false);

  useEffect(() => {
    if (!mapRef || !mapRef.current) return;

    const top = mapRef.current.offsetTop;
    console.log("top", top);
    document.addEventListener(
      "scroll",
      throttle(() => {
        if (!mapRef || !mapRef.current) return;
        if (mapRef.current.offsetTop - top > 0) setIsFull(true);
        else setIsFull(false);
      }),
    );
    return document.removeEventListener("scroll", () => {});
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 md:top-4 z-1 grow md:flex-1/3 h-[300px] md:h-[450px] overflow-hidden md:rounded-md md:mx-0 transition-all delay-100",
        className,
        isFull ? "md:h-[calc(100vh-2rem)] -mx-2" : "",
      )}
      ref={mapRef}
    >
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
