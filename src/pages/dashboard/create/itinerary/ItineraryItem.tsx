import React, { useState } from "react";
import { useItinerary } from "@/context/ItineraryContext";
import { MapPinnedIcon, RouteIcon, StarIcon, XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { StopDetail } from "@/types";
import Editable from "../Editable";
import { formatNumber } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import AddExpense from "./AddExpense";

const ItineraryItem = ({ place }: { place: StopDetail }) => {
  const { removePlace, setExpense, setNote } = useItinerary();
  const [showMore, setShowMore] = useState<boolean>(false);
  const { isMobile } = useMediaQuery();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!place || !place.placeId) return;

    removePlace(place.placeId);
  };

  const handleShowMore = () => {
    if (isMobile) return;

    setShowMore(true);
  };

  const handleShowLess = () => {
    if (isMobile) return;

    setShowMore(false);
  };

  const handleToggleShowMore = () => {
    if (isMobile) setShowMore(!showMore);
  };

  const handleSaveExpense = (expense: number) => {
    setExpense(place.placeId, expense);
  };

  const handleSaveNote = (note: string) => {
    setNote(place.placeId, note);
  };

  return (
    <div
      className="flex my-4 bg-primary/10 rounded-sm items-stretch relative group cursor-pointer"
      onMouseOver={handleShowMore}
      onMouseOut={handleShowLess}
      onClick={handleToggleShowMore}
      role="button"
      tabIndex={0}
      title={showMore ? "Click to show more" : "Click to show less"}
    >
      <IconButton
        onClick={handleClick}
        className="absolute -top-1 -right-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        size="sm"
        variant="ghost"
      >
        <XIcon />
      </IconButton>

      <div className="w-22 shrink-0">
        <img
          className="w-full h-full object-cover rounded-l-sm"
          src={place.imageURL}
          alt={place.name}
        />
      </div>
      <div className="w-full p-3 space-y-2">
        <h3 className="font-medium text-lg/snug text-balance py-1">
          {place.name}
        </h3>
        <p className="text-foreground/70 font-normal text-xs">
          {place.address}
        </p>
        <Editable
          className="text-sm"
          showEditIcon={false}
          lineClamp={3}
          onSave={handleSaveNote}
        >
          {place.note || place.summary || "Add your note here ..."}
        </Editable>
        <div className="flex flex-wrap items-center justify-end text-xs">
          {showMore && (
            <>
              {place.placeGoogleURI && (
                <Link to={place.placeGoogleURI} target="_blank">
                  <Button size={"sm"} variant="link" className="text-xs">
                    <MapPinnedIcon className="size-4 stroke-1" /> Google Map
                  </Button>
                </Link>
              )}
              {place.directionGoogleURI && (
                <Link to={place.directionGoogleURI} target="_blank">
                  <Button size={"sm"} variant="link" className="text-xs">
                    <RouteIcon className="size-4 stroke-1" /> Direction
                  </Button>
                </Link>
              )}
            </>
          )}
          <AddExpense expense={place.expense || 0} onSave={handleSaveExpense} />
        </div>
        {showMore && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ItineraryItem;
