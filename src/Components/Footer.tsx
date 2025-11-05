import React, { useEffect, useState } from "react";
import { fetchData } from "@/util";
import { CityDetail } from "@/types";
import { Link } from "react-router-dom";

function Footer() {
  const [cities, setCities] = useState<CityDetail[]>([]);

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
    <div className="bg-foreground/90 text-background dark:bg-foreground/2 dark:text-foreground mt-14 px-2 py-14">
      <div className="my-0 mx-auto w-full max-w-7xl box-border flex flex-row flex-wrap gap-y-8">
        <div className="grow w-full sm:w-auto flex justify-between sm:justify-around">
          <div className="p-0 sm:p-2 mb-2 sm:mb-0 md:grow">
            <div className="text-sm">
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

          <div className="p-0 sm:p-2 mb-2 sm:mb-0 md:grow">
            <div className="text-sm">
              <ul className="list-none p-0 m-0 text-sm flex flex-col gap-2">
                <li className="font-bold text-lg">Last Updated Cities</li>
                {cities.map((city: CityDetail) => (
                  <Link key={city.placeId} to={`/city/${city.placeId}`}>
                    <li>{city.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="p-0 sm:p-2 mb-2 sm:mb-0 w-full md:w-sm">
          <Link
            to="/"
            className="inline-block w-32 h-11 bg-[url('/images/logo-text-3-light.png')] bg-cover"
          >
            <span className="sr-only">ZipTrip</span>
          </Link>
          <p>
            ZipTrip helps you plan fun and efficient one-day trips in cities
            across the U.S. Discover attractions, food spots, and walking paths
            all in one place.
          </p>
          <p className="mt-6">&copy; 2025 ZipTrip, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
