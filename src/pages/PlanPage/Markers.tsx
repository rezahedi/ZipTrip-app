import React, { useCallback } from "react";
import { Place, Stop as StopType } from "@/types";
import { InfoWindow, Marker } from "@/Components/Map";
import { useMapSync } from "@/context/MapSyncContext";
import ListEditor from "../ExplorePage/places/list/ListEditor";
import { useList } from "@/context/ListContext";
import { CirclePlusIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const Markers = ({ stops }: { stops: StopType[] }) => {
  const { selection, setSelection } = useMapSync();
  const { openEditor } = useList();
  const { token } = useAuth();
  const { openLogin } = useAuthModal();
  const selectedPlace: StopType | null =
    stops.find((s) => s.placeId === selection?.placeId) || null;

  const handleOpenEditor = () => {
    if (!token) return openLogin();
    if (!selectedPlace) return;
    openEditor(selectedPlace as Place);
  };

  const handleClick = useCallback(
    (placeId?: string, location?: [number, number]) => {
      if (placeId) setSelection({ placeId, location, source: "marker" });
    },
    [setSelection],
  );

  const handlePopupClose = useCallback(() => {
    setSelection(null);
  }, [setSelection]);

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
            onClick={handleClick}
          />
        ))}
      {selectedPlace && (
        <InfoWindow
          position={selectedPlace.location}
          onClose={handlePopupClose}
        >
          <div className="flex gap-1 sm:w-xs">
            <img
              className="w-24 object-cover rounded-sm hidden sm:block"
              src={selectedPlace.imageURL}
              alt={selectedPlace.name}
            />
            <div className="flex-4/5 max-h-40 px-2">
              <h3 className="font-medium text-base/snug text-balance py-1">
                {selectedPlace.name}
              </h3>
              <p>{selectedPlace.address}</p>
              <IconButton title="Add to List" onClick={handleOpenEditor}>
                <CirclePlusIcon />
              </IconButton>
            </div>
          </div>
        </InfoWindow>
      )}
      <ListEditor />
    </>
  );
};

export default Markers;
