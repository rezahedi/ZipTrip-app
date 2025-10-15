import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import PopularCities from "./PopularCities";
import { CityType } from "@/context/PlanTypes";
import { fetchData } from "@/util";

const ExploreBlock = () => {
  const [cities, setCities] = useState<CityType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        "plans/city?size=8&sort=-plans",
        null,
        () => {},
      );
      setCities(response.items);
    })();
  }, []);

  if (cities.length === 0) return null;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 my-10">
      <div className="lg:col-span-3 md:col-span-2 col-span-1 min-h-[450px] rounded-4xl bg-[url(/images/manhattan-explore-block.jpg)] bg-cover bg-center flex flex-col justify-between place-items-start p-10 md:p-20">
        <div className="text-white">
          <h2 className="font-medium text-4xl md:text-6xl text-shadow-md">
            Plan to visit{" "}
            <b className="block font-bold">{cities[0].name.split(",")[0]}?</b>
          </h2>
          <h5 className="text-xl md:text-2xl mt-4 text-shadow-md">
            Introducing {cities[0].plans}+ city tour plans
          </h5>
        </div>
        <Link
          className="group rounded-full bg-background py-2 px-4 font-semibold text-lg flex items-center gap-1"
          to={`/city/${cities[0].placeId}`}
        >
          Explore{" "}
          <ChevronRightIcon className="size-6 -mr-1 w-0 transition-all duration-100 group-hover:w-6" />
        </Link>
      </div>
      <PopularCities
        cities={cities}
        className="lg:col-span-1 md:col-span-1 col-span-1"
      />
    </div>
  );
};

export default ExploreBlock;
