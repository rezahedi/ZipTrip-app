import { Skeleton } from "@/Components/ui/skeleton";
import React from "react";

const SidebarSkeleton = () => {
  return (
    <>
      <div className="w-lg p-3">
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-8" />
            <Skeleton className="h-4 w-5/6 mt-4" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-8/12" />
          </div>
          <div className="flex gap-2 h-16">
            {Array.from({ length: 3 }).map((v, i) => (
              <Skeleton key={i} className="w-full h-full" />
            ))}
          </div>
          <div className="flex flex-col gap-2 flex-wrap">
            {Array.from({ length: 5 }).map((v, i) => (
              <div key={i} className="flex gap-1 items-stretch h-16">
                <Skeleton className="w-22 shrink-0 h-full rounded-l-sm" />
                <div className="p-2 grow space-y-2">
                  <Skeleton className="h-6 w-4/6 py-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        Processing the map ...
      </div>
    </>
  );
};

export default SidebarSkeleton;
