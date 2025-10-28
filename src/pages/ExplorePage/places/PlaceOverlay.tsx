import React, { useEffect } from "react";
import { usePlans } from "../PlansContext";
import { StarIcon, XIcon, CirclePlusIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { Place } from "@/types";
import { cn, formatNumber } from "@/lib/utils";
import { useMap } from "@vis.gl/react-google-maps";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SCROLL_BAR_STYLE } from "@/constants";

const PlaceOverlay = () => {
  const { placeDetail, setPlaceDetail } = usePlans();
  const place: Place = placeDetail?.place as Place;
  const map = useMap();
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  useEffect(() => {
    if (!map || !placeDetail || !placeDetail.location) return;

    if (!isMobile) {
      map.panTo({
        lat: placeDetail.location[0],
        lng: placeDetail.location[1],
      });
      if (isDesktop) map.panBy(-320, 0);
      if (isTablet) map.panBy(-160, 100);
    }
  }, [placeDetail]);

  const handleClose = () => {
    if (!placeDetail) return;

    setPlaceDetail(null);
    if (isDesktop) map?.panBy(160, 0);
    if (isTablet) map?.panBy(0, -100);
  };

  if (!place) return null;

  return (
    <div className="@container relative bg-background p-4 md:m-3 lg:my-14 lg:-ml-3 w-full md:w-[calc(100vw-22rem)] lg:w-2xs h-[calc(100vh/3)] lg:h-[calc(100vh-11rem)] box-border rounded-lg lg:rounded-l-none shadow-md">
      <IconButton
        onClick={handleClose}
        variant={"secondary"}
        className="absolute top-1 right-1 text-foreground hover:text-foreground"
      >
        <XIcon />
      </IconButton>
      <div
        className={cn(
          `flex flex-col @md:flex-row-reverse gap-2 h-full overflow-y-auto pr-2 -mr-2`,
          SCROLL_BAR_STYLE,
        )}
      >
        <div className="w-full @md:flex-1/3">
          <img
            className="w-full h-full object-cover rounded-sm"
            src={place.imageURL}
            alt={place.name}
          />
        </div>
        <div className="flex-2/3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-balance">{place.name}</h3>
            <IconButton title="Add to List">
              <CirclePlusIcon />
            </IconButton>
          </div>
          <address className="not-italic text-foreground/80">
            {place.address}
          </address>
          <p className="line-clamp-3 lg:line-clamp-none">{place.summary}</p>
          <hr />
          <p>
            <StarIcon className="size-3" />{" "}
            <b className="font-semibold text-balance">{place.rating}</b> (
            {formatNumber(place.userRatingCount)})
          </p>
          <p>{place.reviewSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOverlay;
