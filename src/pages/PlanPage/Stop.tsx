import React from "react";
import { Place, Stop as StopType } from "@/types";
import { getMarkerIcon } from "@/types/map";
import { useMapSync } from "@/context/MapSyncContext";
import { cn } from "@/lib/utils";
import { CirclePlusIcon, MapPinnedIcon, RouteIcon } from "lucide-react";
import { useList } from "@/context/ListContext";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const Stop = ({ place }: { place: StopType }) => {
  const {
    placeId,
    name,
    address,
    imageURL,
    rating,
    userRatingCount,
    placeGoogleURI,
    directionGoogleURI,
    type,
    reviewSummary,
    summary,
  } = place;
  const { selection, setSelection } = useMapSync();
  const { openEditor } = useList();
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleOpenEditor = () => {
    if (!token) return openLogin();

    openEditor(place as Place);
  };

  const handleSetSelection = () => {
    setSelection({ placeId: place.placeId, source: "card" });
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
      <div className="flex flex-col items-start py-2 p-4 gap-2">
        <h5 className="font-semibold text-lg">
          {getMarkerIcon(type)} {name}
        </h5>
        <p>{address}</p>
        {rating && (
          <p className="line-clamp-2 text-sm">
            {rating} / {userRatingCount} reviews
          </p>
        )}
        {(summary || reviewSummary) && (
          <p className="text-sm">{summary || reviewSummary}</p>
        )}
        <div className="flex flex-wrap items-center gap-1 mt-4 lg:opacity-0 group-hover:opacity-100">
          {placeGoogleURI && (
            <Link to={placeGoogleURI} target="_blank">
              <Button variant="outline" className="hover:bg-foreground/20">
                <MapPinnedIcon /> Google Map
              </Button>
            </Link>
          )}
          {directionGoogleURI && (
            <Link to={directionGoogleURI} target="_blank">
              <Button variant="outline" className="hover:bg-foreground/20">
                <RouteIcon /> Direction
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            className="hover:bg-foreground/20"
            onClick={handleOpenEditor}
          >
            <CirclePlusIcon />
            <span className="hidden sm:inline-block">Add to List</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stop;
