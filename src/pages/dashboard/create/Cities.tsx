import React from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import { Link } from "react-router-dom";
import { City } from "@/types";

const Cities = ({
  cities,
  linked = false,
  className = "",
  onRemove,
}: {
  cities: City[];
  linked?: boolean;
  className?: string;
  onRemove?: (city: City) => void;
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
  city: City;
  onRemove?: (city: City) => void;
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
