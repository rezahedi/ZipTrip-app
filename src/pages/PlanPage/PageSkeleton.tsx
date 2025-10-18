import { Skeleton } from "@/Components/ui/skeleton";
import React from "react";

const PageSkeleton = () => {
  return (
    <div className="py-4">
      <Skeleton className="h-9 w-4/5 sm:w-6/12 mb-2" />
      <Skeleton className="h-7 w-4/6 sm:w-5/12" />
      <div className="flex gap-4 my-4 flex-col md:flex-row-reverse">
        <Skeleton className="grow md:flex-1/3 h-[300px] sm:h-[450px] overflow-hidden rounded-md hidden sm:block" />
        <div className="grow md:flex-2/3 space-y-8">
          <Skeleton className="overflow-hidden flex rounded-md h-[300px] sm:h-[450px]" />
          {Array.from({ length: 4 }).map((v, i) => (
            <div
              key={i}
              className="w-full max-w-3xl sm:h-32 flex sm:items-center gap-4 flex-col sm:flex-row"
            >
              <Skeleton className="w-full sm:w-56 h-48 sm:h-32" />
              <div className="grow flex flex-col gap-2">
                <Skeleton className="h-7 w-5/6 sm:w-9/12" />
                <Skeleton className="h-5 w-3/6 sm:w-7/12" />
                <Skeleton className="h-5 w-4/6 sm:w-8/12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
