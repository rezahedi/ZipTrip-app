import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";

const PlaceCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((v, i) => (
        <Skeleton
          key={i}
          className="flex gap-1 aspect-[16/10] sm:aspect-[6/5] relative cursor-pointer"
        />
      ))}
    </>
  );
};

export default PlaceCardSkeleton;
