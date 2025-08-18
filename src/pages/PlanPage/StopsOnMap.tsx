import React, { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { Stop as StopType } from "@/types";

const MarkersAndPath = ({ stops }: { stops: StopType[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !window.google) return;

    const gmaps = window.google.maps;
    const bounds = new gmaps.LatLngBounds();

    // Create markers and info windows for each stop
    const infoWindow = new gmaps.InfoWindow();
    stops.forEach((stop, index) => {
      if (stop.location.length !== 2) return;

      const position = {
        lat: stop.location[0],
        lng: stop.location[1],
      };

      // Extend bounds to include this stop
      bounds.extend(position);

      const marker = new gmaps.Marker({
        position,
        map,
        title: stop.name,
        label: {
          text: `${index + 1}`,
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "14px",
        },
      });

      // Set custom content (can be HTML)
      const content = `
        <div style="max-width:260px">
          <img src="${stop.imageURL}" alt="${stop.name}" style="width:100%;height:auto;border-radius:4px;" />
          <h3>${stop.name}</h3>
        </div>
      `;

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      // Fit map to bounds once all markers are placed
      map.fitBounds(bounds);
    });
  }, [map]);

  return null;
};

const StopsOnMap = ({
  className,
  stops,
}: {
  className: string;
  stops: StopType[];
}) => {
  return (
    <div className={className}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Map
          defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
          defaultZoom={4}
          style={{ width: "100%", height: "100%" }}
          gestureHandling="cooperative"
          streetViewControl={false}
          fullscreenControl={false}
        />
        <MarkersAndPath stops={stops} />
      </APIProvider>
    </div>
  );
};

export default StopsOnMap;
