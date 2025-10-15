import React from "react";
import { cn } from "@/lib/utils";
import { CityType } from "@/context/PlanTypes";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { Link } from "react-router-dom";

const Cities = ({
  cities,
  linked = false,
  className = "",
  onRemove,
}: {
  cities: CityType[];
  linked?: boolean;
  className?: string;
  onRemove?: (city: CityType) => void;
}) => {
  if (!cities) return null;

  if (linked)
    return (
      <>
        {cities.map((city) => (
          <Link
            to={`/city/${city.placeId}`}
            key={city.placeId}
            className={cn(
              "rounded-md text-sm bg-primary/15 text-foreground p-2 px-3 text-nowrap flex flex-row gap-2 items-center",
              className,
            )}
          >
            <Item city={city} onRemove={onRemove} />
          </Link>
        ))}
      </>
    );

  // Unlinked items
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
          <Item city={city} onRemove={onRemove} />
        </div>
      ))}
    </>
  );
};

const Item = ({
  city,
  onRemove,
}: {
  city: CityType;
  onRemove?: (city: CityType) => void;
}) => {
  return (
    <>
      {city.name}
      {onRemove && (
        <IconButton onClick={() => onRemove(city)} className="size-6">
          <XIcon className="size-9/12" />
        </IconButton>
      )}
    </>
  );
};

export default Cities;
