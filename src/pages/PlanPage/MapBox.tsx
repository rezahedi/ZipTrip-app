import React, { useEffect, useRef, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Stop as StopType } from "@/types";
import { calculateBounds, cn, getThemeColor, throttle } from "@/lib/utils";
import Markers from "./Markers";

const MapBox = ({
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
          <Markers stops={stops} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapBox;
