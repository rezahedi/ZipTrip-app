import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";

const PlacePopupSkeleton = () => {
  return (
    <div className="flex gap-1 w-[230px] h-[128px]">
      <Skeleton className="w-24 h-full rounded-sm" />
      <div className="flex-4/5 max-h-40 px-2">
        <Skeleton className="w-9/12 h-7 mb-4" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 w-8/12 mb-2" />
      </div>
    </div>
  );
};

export default PlacePopupSkeleton;
