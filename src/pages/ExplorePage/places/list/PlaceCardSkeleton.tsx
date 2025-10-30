import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PlaceCardSkeleton = () => {
  const { isMobile } = useMediaQuery();
  const length = isMobile ? 2 : 3;

  return (
    <>
      {Array.from({ length }).map((v, i) => (
        <Skeleton
          key={i}
          className="flex gap-1 aspect-[16/10] sm:aspect-[6/5] relative cursor-pointer"
        />
      ))}
    </>
  );
};

export default PlaceCardSkeleton;
