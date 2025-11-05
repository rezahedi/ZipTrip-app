import React, { useState, useEffect } from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import { fetchData } from "@/util";
import { Link } from "react-router-dom";
import { CityDetail } from "@/types";

const CitiesSection = ({ title }: { title: string }) => {
  const [cities, setCities] = useState<CityDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add skeleton loading feature later

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const result = await fetchData(
          `plans/city?size=6&sort=-createdAt`,
          "",
          setError,
        );
        setCities(result.items);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCities();
  }, []);

  if (error) return;

  return (
    <div className="rounded-md bg-accent/10 px-5 py-6">
      <h5 className="mb-6 font-semibold text-2xl">{title}</h5>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {!loading && error && <p>{error}</p>}
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="rounded-full size-[180px]" />
                <Skeleton className="mx-4 h-7" />
              </div>
            ))}
          {cities.map((city) => (
            <Link
              to={`/city/${city.placeId}`}
              style={{ textDecoration: "none" }}
              key={city.placeId}
              className="group flex flex-col items-center gap-2"
            >
              <div className="rounded-full size-[180px] overflow-hidden">
                <img
                  className="size-full group-hover:scale-110 transition-all duration-200"
                  alt={city.name}
                  src={city.imageURL}
                />
              </div>
              <h6 className="text-center text-xl group-hover:text-accent transition-all duration-200">
                {city.name.split(",")[0]}
              </h6>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesSection;
