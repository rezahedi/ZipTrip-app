import React from "react";
import { Skeleton } from "../ui/skeleton";

function PlanCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-48 rounded-lg mb-2" />
      <Skeleton className="w-11/12 h-7" />
      <Skeleton className="w-10/12 h-5" />
    </div>
  );
}

export default PlanCardSkeleton;
