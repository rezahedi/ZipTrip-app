import React from "react";
import { Stop as StopType } from "@/types";
import { InfoWindow, Marker } from "@/Components/Map";
import { useMapSync } from "@/context/MapSyncContext";

const Markers = ({ stops }: { stops: StopType[] }) => {
  const { selection, setSelection } = useMapSync();
  const selectedPlace: StopType | null =
    stops.find((s) => s.placeId === selection?.placeId) || null;

  const handlePopupClose = () => {
    setSelection(null);
  };

  return (
    <>
      {stops.length > 0 &&
        stops.map((stop, i) => (
          <Marker
            key={stop.placeId}
            placeId={stop.placeId}
            emoji={i == 0 ? "A" : i === stops.length - 1 ? "B" : String(i + 1)}
            title={stop.name}
            position={stop.location}
            iconURL="/places/emoji_marker_red.svg"
            onClick={setSelection}
          />
        ))}
      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.location}
          onClose={handlePopupClose}
        >
          <div className="flex gap-1 sm:w-xs sm:h-32">
            <img
              className="w-24 h-full object-cover rounded-sm hidden sm:block"
              src={selectedPlace.imageURL}
              alt={selectedPlace.name}
            />
            <div className="flex-4/5 max-h-40 px-2">
              <h3 className="font-medium text-base/snug text-balance py-1">
                {selectedPlace.name}
              </h3>
              <p>{selectedPlace.address}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
