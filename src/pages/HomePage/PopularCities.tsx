import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const DUMMY_CITIES = [
  { name: "San Francisco", plans: 2302 },
  { name: "Los Angeles", plans: 1830 },
  { name: "Las Vegas", plans: 1472 },
  { name: "Boston", plans: 1359 },
  { name: "Chicago", plans: 1072 },
  { name: "Austin", plans: 1020 },
  { name: "Denver", plans: 857 },
  { name: "Seattle", plans: 704 },
];

const PopularCities = ({ className = "" }: { className: string }) => {
  return (
    <div
      className={cn(
        "rounded-4xl bg-primary/15 text-foreground py-8 p-6",
        className,
      )}
    >
      <h3 className="font-semibold text-2xl">Popular Cities</h3>
      <ul className="my-8 text-xl flex md:flex-col md:flex-nowrap flex-wrap gap-3 md:gap-1">
        {DUMMY_CITIES.map((city) => (
          <li>
            <Link
              to={`/search?q=${city.name}`}
              className="flex gap-2 justify-between bg-primary/10 p-2 md:bg-transparent hover:bg-primary/30 md:hover:px-3 md:hover:-mx-2 transition-all duration-100 md:px-0 md:py-2 rounded-md"
            >
              {city.name} : <span>{city.plans}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCities;
