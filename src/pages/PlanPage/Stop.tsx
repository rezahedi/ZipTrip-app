import React from "react";
import { StopDetail } from "@/types";
import { getMarkerIcon } from "@/types/map";
import { useMapSync } from "@/context/MapSyncContext";
import { cn, formatNumber } from "@/lib/utils";
import {
  CirclePlusIcon,
  MapPinnedIcon,
  RouteIcon,
  StarIcon,
  TicketMinusIcon,
} from "lucide-react";
import { useList } from "@/context/ListContext";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const usDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const Stop = ({ place }: { place: StopDetail }) => {
  const { selection, setSelection } = useMapSync();
  const { openEditor } = useList();
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleOpenEditor = () => {
    if (!token) return openLogin();

    openEditor(place);
  };

  const handleSetSelection = () => {
    setSelection({ placeId: place.placeId, source: "card" });
  };

  if (!place.placeId) return null;

  return (
    <div
      onClick={handleSetSelection}
      onMouseOver={handleSetSelection}
      className={cn(
        `group transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg rounded-lg flex items-start sm:items-center gap-0.5 flex-col sm:flex-row overflow-hidden bg-foreground/3`,
        selection && selection.placeId === place.placeId
          ? `bg-foreground/10`
          : ``,
      )}
    >
      {place.imageURL && (
        <img
          src={place.imageURL}
          alt={place.name}
          className="w-full sm:w-56 object-cover group-hover:scale-105 transition-all duration-200"
        />
      )}
      <div className="flex flex-col items-start py-2 p-4 gap-2">
        <h5 className="font-semibold text-lg">
          {getMarkerIcon(place.type)} {place.name}{" "}
          {place.expense !== undefined && place.expense > 0 && (
            <span className="inline-block">
              <span className="flex gap-1 items-center font-normal text-sm py-0.5 px-2.5 rounded-full bg-accent/40">
                <TicketMinusIcon className="size-4 stroke-1" />
                {usDollarFormatter.format(place.expense)}
              </span>
            </span>
          )}
        </h5>
        <p>{place.address}</p>

        {(place.note || place.summary) && (
          <p className="text-sm">{place.note || place.summary}</p>
        )}
        {place.rating && (
          <div className="text-sm">
            <p className="flex gap-1 items-center text-sm">
              <StarIcon className="size-3" />
              <b className="font-semibold">{place.rating}</b> (
              {formatNumber(place.userRatingCount)} reviews)
            </p>
            {place.reviewSummary || ""}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-1 mt-4 lg:opacity-0 group-hover:opacity-100">
          {place.placeGoogleURI && (
            <Link to={place.placeGoogleURI} target="_blank">
              <Button variant="outline" className="hover:bg-foreground/20">
                <MapPinnedIcon /> Google Map
              </Button>
            </Link>
          )}
          {place.directionGoogleURI && (
            <Link to={place.directionGoogleURI} target="_blank">
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
