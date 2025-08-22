import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  HistoryIcon as FullDayIcon,
  ClockIcon as HalfDayIcon,
  Clock10Icon as NightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const StatsBlock = ({
  stats,
  className,
}: {
  stats: {
    rate: number;
    reviewCount: number;
    type: string | undefined;
    distance: number;
    stopCount: number;
    duration: string;
    categoryId: { _id: string; name: string; imageURL: string };
  };
  className?: string;
}) => {
  const { rate, reviewCount, type, distance, stopCount, duration, categoryId } =
    stats;
  return (
    <div
      className={cn(
        "flex flex-wrap gap-10 gap-y-0.5 text-sm sm:text-base text-foreground/65",
        className,
      )}
    >
      {type && (
        <div className="flex flex-col gap-1 text-4xl font-semibold text-foreground">
          {type === "Full day" && <FullDayIcon className="size-10" />}
          {type === "Half day" && <HalfDayIcon className="size-10" />}
          {type === "Night" && <NightIcon className="size-10" />}
          <span className="text-sm font-normal text-foreground/80">{type}</span>
        </div>
      )}
      {stopCount > 0 && (
        <div className="flex flex-col gap-1 text-4xl font-semibold text-foreground">
          <span>{stopCount}</span>
          <span className="text-sm font-normal text-foreground/80">Places</span>
        </div>
      )}
      {distance > 0 && (
        <div className="flex flex-col gap-1 text-4xl font-semibold text-foreground">
          <span>
            {distance} <span className="text-sm">mi</span>
          </span>
          <span className="text-sm font-normal text-foreground/80">
            Distance
          </span>
        </div>
      )}
      {duration !== "" && (
        <div className="flex flex-col gap-1 text-4xl font-semibold text-foreground">
          <span>
            {duration} <span className="text-sm">hr</span>
          </span>
          <span className="text-sm font-normal text-foreground/80">
            Duration
          </span>
        </div>
      )}
      {reviewCount > 0 && (
        <div className="flex flex-col gap-1 text-4xl font-semibold text-foreground">
          <span>
            {rate} <span className="text-sm">/{reviewCount}</span>
          </span>
          <span className="text-sm font-normal text-foreground/80">
            Reviews
          </span>
        </div>
      )}
      <span>
        <Link
          to={`/category/${categoryId._id}`}
          className="flex flex-col gap-1"
        >
          <Avatar className="size-10">
            <AvatarImage
              src={categoryId.imageURL}
              alt={categoryId.name}
              className="bg-primary"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal text-foreground/80">
            {categoryId.name}
          </span>
        </Link>
      </span>
    </div>
  );
};

export default StatsBlock;
