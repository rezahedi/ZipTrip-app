import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CityType } from "@/context/PlanTypes";

const PopularCities = ({
  cities,
  className = "",
}: {
  cities: CityType[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-4xl bg-primary/15 text-foreground py-8 p-6",
        className,
      )}
    >
      <h3 className="font-semibold text-2xl">Popular Cities</h3>
      <ul className="my-8 text-xl flex md:flex-col md:flex-nowrap flex-wrap gap-3 md:gap-1">
        {cities.map((city: CityType) => (
          <li key={city.placeId}>
            <Link
              to={`/city/${city.placeId}`}
              className="flex gap-2 justify-between bg-primary/10 p-2 md:bg-transparent hover:bg-primary/30 md:hover:px-3 md:hover:-mx-2 transition-all duration-100 md:px-0 md:py-2 rounded-md"
            >
              {city.name.split(",")[0]} : <span>{city.plans}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCities;
