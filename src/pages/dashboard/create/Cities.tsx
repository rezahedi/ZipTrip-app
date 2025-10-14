import React from "react";
import { cn } from "@/lib/utils";
import { CityType } from "@/context/PlanTypes";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";

const Cities = ({
  cities,
  className = "",
  onRemove,
}: {
  cities: CityType[];
  className?: string;
  onRemove?: (city: CityType) => void;
}) => {
  if (!cities) return null;
  console.log("onRemove", onRemove);
  return (
    <>
      {cities.map((city) => (
        <div
          key={city.placeId}
          className={cn(
            "rounded-md text-sm bg-primary/15 text-foreground p-2 px-3 text-nowrap flex flex-row gap-2 items-center",
            className,
          )}
        >
          {city.name}
          {onRemove && (
            <IconButton onClick={() => onRemove(city)} className="size-6">
              <XIcon className="size-9/12" />
            </IconButton>
          )}
        </div>
      ))}
    </>
  );
};

export default Cities;
