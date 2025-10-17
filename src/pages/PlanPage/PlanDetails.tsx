import React, { useState, lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import IconButton from "@/Components/ui/IconButton";
import { Share2Icon } from "lucide-react";
import StopsOnMap from "./StopsOnMap";
import Stops from "./Stops";
import ImageBlock from "./ImageBlock";
import { PlanWithStops } from "@/types";
import StatsBlock from "./StatsBlock";
import Cities from "../dashboard/create/Cities";
import BookmarkButton from "@/Components/Common/BookmarkButton";

const ShareDialog = lazy(() => import("./ShareDialog"));

const PlanDetails = ({ plan }: { plan: PlanWithStops }) => {
  const {
    _id: planId,
    title,
    description,
    images,
    cities,
    stops,
    type,
    stopCount,
    distance,
    duration,
    userId,
    rate,
    reviewCount,
    isBookmarked,
    updatedAt,
  } = plan;
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {}, [isBookmarked]);

  const setError = (errorMessage: string) => {
    console.log("error", errorMessage);
  };

  return (
    <>
      <article className="py-4">
        <div className="flex justify-between flex-wrap mb-4">
          {/* Title */}
          <h4 className="text-3xl">{title}</h4>

          {/* Icon Buttons */}
          <div className="flex gap-1 flex-1 sm:flex-auto justify-end">
            <IconButton
              variant="ghost"
              onClick={() => setIsShareDialogOpen(true)}
            >
              <Share2Icon className="size-6" />
            </IconButton>
            {isShareDialogOpen && (
              <Suspense>
                <ShareDialog
                  isOpen={isShareDialogOpen}
                  onClose={() => setIsShareDialogOpen(false)}
                />
              </Suspense>
            )}
            <BookmarkButton
              planId={planId}
              isBookmarked={isBookmarked}
              setError={setError}
              className=""
            />
          </div>
        </div>

        <div className="flex gap-4 text-sm text-foreground/80 items-center">
          <Link to={`/user/${userId._id}`} className="flex gap-2 items-center">
            <Avatar className="size-6">
              <AvatarImage
                src={userId.imageURL}
                alt={userId.name}
                className="bg-primary"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {userId.name}
          </Link>
          {updatedAt && (
            <>
              ·{" "}
              <time dateTime={new Date(updatedAt).toISOString()}>
                {new Date(updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </>
          )}
          {cities && (
            <>
              ·{" "}
              <Cities
                cities={cities}
                linked
                className="p-1 px-2 bg-primary/10 hover:bg-primary/20"
              />
            </>
          )}
        </div>

        <div className="flex gap-4 my-4 flex-col md:flex-row-reverse">
          <StopsOnMap
            className="sticky top-0 md:top-4 z-1 grow md:flex-1/3 h-[300px] sm:h-[450px] overflow-hidden rounded-md"
            stops={stops}
          />
          <div className="grow md:flex-2/3">
            {images?.length > 0 && (
              <ImageBlock
                className="overflow-hidden flex rounded-md h-[300px] sm:h-[450px]"
                images={images}
              />
            )}

            <StatsBlock
              className="py-6"
              stats={{
                rate,
                reviewCount,
                type,
                distance,
                stopCount,
                duration,
              }}
            />

            <p className="py-6">{description}</p>

            {stops.length > 0 && <Stops stops={stops} />}
          </div>
        </div>
      </article>
    </>
  );
};

export default PlanDetails;
