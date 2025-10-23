import React from "react";
import { Stop as StopType } from "@/types";
import { getMarkerIcon } from "@/types/map";
import { useMapSync } from "@/context/MapSyncContext";
import { cn } from "@/lib/utils";

const Stop = ({ detail }: { detail: StopType }) => {
  const { placeId, name, imageURL, address, type, rating, userRatingCount } =
    detail;
  const { selection, setSelection } = useMapSync();

  const handleSetSelection = () => {
    setSelection({ placeId: detail.placeId, source: "card" });
  };

  if (!placeId) return null;

  return (
    <div
      onClick={handleSetSelection}
      onMouseOver={handleSetSelection}
      className={cn(
        `group transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg rounded-lg flex items-start sm:items-center gap-0.5 flex-col sm:flex-row overflow-hidden bg-foreground/3`,
        selection && selection.placeId === placeId ? `bg-foreground/10` : ``,
      )}
    >
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="w-full sm:w-56 object-cover group-hover:scale-105 transition-all duration-200"
        />
      )}
      <div className="flex flex-col content-start py-2 p-4 gap-2">
        <h5 className="font-semibold text-lg">
          {getMarkerIcon(type)} {name}
        </h5>
        <p>{address}</p>
        {rating && (
          <p className="line-clamp-2 text-sm">
            {rating} / {userRatingCount} reviews
          </p>
        )}
      </div>
    </div>
  );
};

export default Stop;
