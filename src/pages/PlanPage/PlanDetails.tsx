import React, { useState, lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import IconButton from "@/Components/ui/IconButton";
import { Share2Icon, SquarePenIcon } from "lucide-react";
import MapBox from "./MapBox";
import Stops from "./Stops";
import ImageBlock from "./ImageBlock";
import { PlanWithStops } from "@/types";
import StatsBlock from "./StatsBlock";
import Cities from "../dashboard/create/Cities";
import BookmarkButton from "@/Components/Common/BookmarkButton";
import { MapSyncProvider } from "@/context/MapSyncContext";
import { ListProvider } from "@/context/ListContext";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/AuthContext";

const ShareDialog = lazy(() => import("./ShareDialog"));

const PlanDetails = ({ plan }: { plan: PlanWithStops }) => {
  const {
    _id: planId,
    title,
    description,
    images,
    cities,
    stops,
    polyline,
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
  const { user } = useAuth();

  useEffect(() => {}, [isBookmarked]);

  const setError = (errorMessage: string) => {
    console.log("error", errorMessage);
  };

  return (
    <>
      <article className="py-4">
        <div className="flex justify-between flex-wrap mb-4">
          {/* Title */}
          <h4 className="text-3xl flex items-center gap-2">
            {title}
            {user && userId._id === user?._id && (
              <Link to={`/create/${planId}`}>
                <Button
                  title="Edit"
                  variant={"outline"}
                  className="hover:bg-foreground/10"
                >
                  <SquarePenIcon /> Edit
                </Button>
              </Link>
            )}
          </h4>

          {/* Icon Buttons */}
          <div className="flex gap-1 flex-1 sm:flex-auto justify-end">
            <IconButton
              title="Share"
              variant="ghost"
              onClick={() => setIsShareDialogOpen(true)}
            >
              <Share2Icon />
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

        <MapSyncProvider>
          <ListProvider>
            <div className="flex gap-4 my-4 flex-col md:flex-row-reverse">
              <MapBox stops={stops} polyline={polyline || ""} />
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
          </ListProvider>
        </MapSyncProvider>
      </article>
    </>
  );
};

export default PlanDetails;
