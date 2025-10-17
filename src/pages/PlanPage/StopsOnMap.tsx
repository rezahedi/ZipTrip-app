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
    const infoWindow = new gmaps.InfoWindow({
      maxWidth: 340,
    });
    stops.forEach((stop, index) => {
      if (stop.location.length !== 2) return;

      const position = {
        lat: stop.location[0],
        lng: stop.location[1],
      };

      // Extend bounds to include this stop
      bounds.extend(position);
      const labelText =
        index === 0 ? "A" : index === stops.length - 1 ? "B" : `${index + 1}`;

      const marker = new gmaps.Marker({
        position,
        map,
        title: stop.name,
        icon: {
          url: "/places/emoji_marker_red.svg",
          scaledSize: new window.google.maps.Size(38, 38),
          anchor: new window.google.maps.Point(19, 38),
        },
        label: {
          text: labelText,
          color: "#000",
          fontWeight: "bold",
          fontSize: "16px",
        },
      });

      // Set custom content (can be HTML)
      const content = `
        <div style="display:flex;gap:4px;width:100%;height:100px">
        <div style="flex-shrink:1">
          <img
            style="width:80px;height:100%;border-radius:4px;object-fit:cover"
            src="${stop.imageURL}"
            alt="${stop.name}"
          /></div>
          <div style="flex-shrink:4;max-height:160px;padding:0 8px">
            <p style="font-weight:400;font-size:16px;padding:4px 0">${stop.address}</p>
            <p>${stop.rating} / ${stop.userRatingCount} reviews</p>
          </div>
        </div>
      `;

      const headerElement = document.createElement("h3");
      headerElement.textContent = stop.name;
      headerElement.style = "font-weight:500;font-size:18px;text-wrap:balance";

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.setHeaderContent(headerElement);
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
