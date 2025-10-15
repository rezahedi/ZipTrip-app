import React, { useEffect, useState } from "react";
import { fetchData } from "@/util";
import { CityType } from "@/context/PlanTypes";
import { Link } from "react-router-dom";

function Footer() {
  const [cities, setCities] = useState<CityType[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const result = await fetchData(
          `plans/city?size=5&sort=-updatedAt`,
          null,
          setError,
        );
        setCities(result.items);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCities();
  }, []);

  const setError = (errorMessage: string) => {
    console.log("error", errorMessage);
  };

  return (
    <div className="bg-foreground/90 text-background mt-6 px-2 py-4">
      <div className="my-0 mx-auto w-full max-w-7xl box-border flex flex-row flex-wrap gap-y-2">
        <div className="p-0 sm:p-2 mb-2 sm:mb-0 w-full sm:w-auto">
          <Link to="/">
            <img
              src="/images/logo-text-3-light.png"
              width={160}
              className="opacity-70 mb-10"
            />
          </Link>
          <p className="max-w-2xs">
            ZipTrip helps you plan fun and efficient one-day trips in cities
            across the U.S. Discover attractions, food spots, and walking paths
            all in one place.
          </p>
          <p className="mt-6">&copy; 2025 ZipTrip, All rights reserved.</p>
        </div>
        <div className="grow w-full sm:w-auto flex justify-between sm:justify-around">
          <div className="p-0 sm:p-2 mb-2 sm:mb-0">
            <div className="text-sm text-background">
              <ul className="list-none p-0 m-0 text-sm flex flex-col gap-2">
                <Link to="/" color="primary">
                  <li className="font-bold text-lg">Home</li>
                </Link>
                <Link
                  to="https://ii-practicum-team-5-back-1.onrender.com/api-docs"
                  target="_blank"
                  color="primary"
                >
                  <li>API Documentation</li>
                </Link>
                <Link
                  to="https://github.com/Code-the-Dream-School/ii-practicum-team-5-back"
                  target="_blank"
                  color="primary"
                >
                  <li>Backend Repository</li>
                </Link>
                <Link
                  to="https://github.com/Code-the-Dream-School/ii-practicum-team-5-front"
                  target="_blank"
                  color="primary"
                >
                  <li>Frontend Repository</li>
                </Link>
                <Link
                  to="https://codethedream.org/classes/practicum"
                  target="_blank"
                  color="primary"
                >
                  <li>Practicum Program</li>
                </Link>
                <Link
                  to="https://codethedream.org"
                  target="_blank"
                  color="primary"
                >
                  <li>Code The Dream</li>
                </Link>
              </ul>
            </div>
          </div>

          <div className="p-0 sm:p-2 mb-2 sm:mb-0">
            <div className="text-sm text-background">
              <ul className="list-none p-0 m-0 text-sm flex flex-col gap-2">
                <li className="font-bold text-lg">Last Updated Cities</li>
                {cities.map((city: CityType) => (
                  <Link key={city.placeId} to={`/city/${city.placeId}`}>
                    <li>{city.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
